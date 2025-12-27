import { NextRequest, NextResponse } from 'next/server';

/**
 * Play Integrity API Verification Endpoint
 * 
 * This endpoint verifies Play Integrity tokens sent from Android apps.
 * 
 * Request body:
 * {
 *   "token": "eyJhbGciOiJSUzI1NiIs..." // Play Integrity token from Android app
 * }
 * 
 * Response:
 * {
 *   "valid": boolean,
 *   "deviceIntegrity": {...},
 *   "appIntegrity": {...},
 *   "accountDetails": {...},
 *   "error"?: string
 * }
 */

interface PlayIntegrityVerifyRequest {
  token: string;
}

interface PlayIntegrityResponse {
  valid: boolean;
  deviceIntegrity?: {
    meetsDeviceIntegrity: boolean;
    recentDeviceActivity?: any;
    deviceAttributes?: any;
  };
  appIntegrity?: {
    appRecognitionVerdict: string; // PLAY_RECOGNIZED, UNRECOGNIZED_VERSION, UNEVALUATED
    packageName?: string;
    certificateDigest?: string[];
    versionCode?: string;
  };
  accountDetails?: {
    appLicensingVerdict: string; // LICENSED, UNLICENSED, UNEVALUATED
  };
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PlayIntegrityVerifyRequest = await request.json();

    if (!body.token) {
      return NextResponse.json(
        { valid: false, error: 'Missing token in request body' },
        { status: 400 }
      );
    }

    // Get Google Cloud project ID from environment
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    if (!projectId) {
      console.error('GOOGLE_CLOUD_PROJECT_ID environment variable is not set');
      return NextResponse.json(
        { valid: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Verify the token using Google Play Integrity API
    // Note: This requires the @google-cloud/playintegrity package
    // For now, we'll use the REST API directly
    
    const integrityApiUrl = `https://playintegrity.googleapis.com/v1/${projectId}:decodeIntegrityToken`;
    
    // Get access token for authentication
    // If using Firebase Service Account, we can use it for authentication
    const accessToken = await getAccessToken();
    
    if (!accessToken) {
      console.error('Failed to get access token for Play Integrity API');
      return NextResponse.json(
        { valid: false, error: 'Authentication error' },
        { status: 500 }
      );
    }

    // Call Play Integrity API
    const response = await fetch(integrityApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        integrityToken: body.token,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Play Integrity API error:', response.status, errorData);
      return NextResponse.json(
        { valid: false, error: `Play Integrity API error: ${response.status}` },
        { status: response.status }
      );
    }

    const integrityData = await response.json();
    
    // Parse the response
    const tokenPayloadExternal = integrityData.tokenPayloadExternal;
    if (!tokenPayloadExternal) {
      return NextResponse.json(
        { valid: false, error: 'Invalid token response' },
        { status: 400 }
      );
    }

    const requestDetails = tokenPayloadExternal.requestDetails;
    const deviceIntegrity = tokenPayloadExternal.deviceIntegrity;
    const appIntegrity = tokenPayloadExternal.appIntegrity;
    const accountDetails = tokenPayloadExternal.accountDetails;

    // Check device integrity
    const meetsDeviceIntegrity = deviceIntegrity?.deviceRecognitionVerdict?.includes('MEETS_DEVICE_INTEGRITY') || false;

    // Check app integrity
    const appRecognitionVerdict = appIntegrity?.appRecognitionVerdict || 'UNEVALUATED';

    // Check account details
    const appLicensingVerdict = accountDetails?.appLicensingVerdict || 'UNEVALUATED';

    // Determine if the token is valid based on your requirements
    // You can customize this logic based on your security requirements
    const isValid = meetsDeviceIntegrity && 
                    (appRecognitionVerdict === 'PLAY_RECOGNIZED' || appRecognitionVerdict === 'UNEVALUATED');

    const result: PlayIntegrityResponse = {
      valid: isValid,
      deviceIntegrity: {
        meetsDeviceIntegrity,
        recentDeviceActivity: deviceIntegrity?.recentDeviceActivity,
        deviceAttributes: deviceIntegrity?.deviceAttributes,
      },
      appIntegrity: {
        appRecognitionVerdict,
        packageName: appIntegrity?.packageName,
        certificateDigest: appIntegrity?.certificateDigest,
        versionCode: appIntegrity?.versionCode,
      },
      accountDetails: {
        appLicensingVerdict,
      },
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error verifying Play Integrity token:', error);
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Get access token for Google Play Integrity API
 * Uses Firebase Service Account if available, otherwise tries Application Default Credentials
 */
async function getAccessToken(): Promise<string | null> {
  try {
    // Try to use Firebase Service Account if available
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountKey) {
      const serviceAccount = JSON.parse(serviceAccountKey);
      const { GoogleAuth } = await import('google-auth-library');
      const auth = new GoogleAuth({
        credentials: serviceAccount,
        scopes: ['https://www.googleapis.com/auth/playintegrity'],
      });
      const client = await auth.getClient();
      const accessToken = await client.getAccessToken();
      return accessToken.token || null;
    }

    // Fallback to Application Default Credentials
    const { GoogleAuth } = await import('google-auth-library');
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/playintegrity'],
    });
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    return accessToken.token || null;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}

