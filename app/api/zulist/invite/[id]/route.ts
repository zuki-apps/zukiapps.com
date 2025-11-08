import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  try {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      : undefined;

    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      // Try to use default credentials (for local development or if using Application Default Credentials)
      admin.initializeApp();
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: invitationId } = await params;

    if (!invitationId) {
      return new NextResponse('Invalid invitation link', { status: 400 });
    }

    // Query Firestore for the invitation
    const invitationQuery = await admin.firestore()
      .collection('invitations')
      .where('invitationId', '==', invitationId)
      .limit(1)
      .get();

    if (invitationQuery.empty) {
      return new NextResponse('Invitation not found or expired', { status: 404 });
    }

    const invitationData = invitationQuery.docs[0].data();
    if (!invitationData) {
      return new NextResponse('Invitation data not found', { status: 404 });
    }

    // Check if invitation is still valid
    const now = admin.firestore.Timestamp.now();
    const expiresAt = invitationData.expiresAt;
    const isActive = invitationData.isActive !== false;
    const remainingUses = typeof invitationData.remainingUses === 'number' ? invitationData.remainingUses : 1;

    if (!isActive || remainingUses <= 0) {
      return new NextResponse('Invitation has expired', { status: 410 });
    }

    if (expiresAt && now.toMillis() > expiresAt.toMillis()) {
      return new NextResponse('Invitation has expired', { status: 410 });
    }

    if (invitationData.status === 'used') {
      return new NextResponse('Invitation has already been used', { status: 410 });
    }

    // Pass invitation data to the page via query params or return JSON
    // For now, redirect to the invite page - the page will fetch data if needed
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zukiapps.com';
    const listName = invitationData.listName || '';
    const redirectUrl = listName 
      ? `${baseUrl}/zulist/invite/${invitationId}?listName=${encodeURIComponent(listName)}`
      : `${baseUrl}/zulist/invite/${invitationId}`;
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error('Error handling invitation:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

