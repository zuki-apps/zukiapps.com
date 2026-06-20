import type { LucideIcon } from 'lucide-react';
import {
  Binary,
  FolderTree,
  Gamepad2,
  Grid3X3,
  History,
  Layers,
  Lightbulb,
  LineChart,
  Lock,
  Map as MapIcon,
  MapPinned,
  Music,
  Share2,
  Shield,
  Sparkles,
  Target,
  Timer,
  Trophy,
  Users,
  Volume2,
  Wand2,
  Palette,
  Wifi,
} from 'lucide-react';

export type CarouselFeatureCell = {
  Icon: LucideIcon;
  labelKey: string;
  cellClass: string;
  iconClassName: string;
};

export function getCarouselFeatureCells(appId: string): CarouselFeatureCell[] | null {
  switch (appId) {
    case 'zulist':
      return [
        {
          Icon: Users,
          labelKey: 'zulist.features.realtime',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-blue-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-blue-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-blue-400 mb-2',
        },
        {
          Icon: Wifi,
          labelKey: 'zulist.features.offline',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-blue-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-blue-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-blue-400 mb-2',
        },
        {
          Icon: Sparkles,
          labelKey: 'zulist.features.smart',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-blue-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-blue-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-blue-400 mb-2',
        },
      ];
    case 'hush-gallery':
      return [
        {
          Icon: Shield,
          labelKey: 'hushGallery.features.privacy',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-purple-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-purple-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-purple-400 mb-2',
        },
        {
          Icon: Lock,
          labelKey: 'hushGallery.features.secure',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-purple-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-purple-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-purple-400 mb-2',
        },
        {
          Icon: FolderTree,
          labelKey: 'hushGallery.features.organized',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-purple-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-purple-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-purple-400 mb-2',
        },
      ];
    case 'whistle-camera':
      return [
        {
          Icon: Volume2,
          labelKey: 'whistleCamera.features.handsFree',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-amber-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-amber-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-amber-400 mb-2',
        },
        {
          Icon: Target,
          labelKey: 'whistleCamera.features.calibration',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-amber-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-amber-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-amber-400 mb-2',
        },
        {
          Icon: Sparkles,
          labelKey: 'whistleCamera.features.widgets',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-amber-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-amber-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-amber-400 mb-2',
        },
      ];
    case 'power-interval-timer':
      return [
        {
          Icon: Timer,
          labelKey: 'powerIntervalTimer.features.configurable',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-orange-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-orange-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-orange-400 mb-2',
        },
        {
          Icon: Timer,
          labelKey: 'powerIntervalTimer.features.display',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-orange-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-orange-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-orange-400 mb-2',
        },
        {
          Icon: Timer,
          labelKey: 'powerIntervalTimer.features.offline',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-orange-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-orange-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-orange-400 mb-2',
        },
      ];
    case 'bit-scope':
      return [
        {
          Icon: Binary,
          labelKey: 'bitScope.features.bitEditor',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-cyan-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-cyan-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-cyan-400 mb-2',
        },
        {
          Icon: Binary,
          labelKey: 'bitScope.features.formats',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-cyan-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-cyan-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-cyan-400 mb-2',
        },
        {
          Icon: Binary,
          labelKey: 'bitScope.features.bases',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-cyan-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-cyan-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-cyan-400 mb-2',
        },
      ];
    case 'sudoku-puzzle':
      return [
        {
          Icon: Grid3X3,
          labelKey: 'sudokuPuzzle.features.difficulty',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-teal-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-teal-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-teal-400 mb-2',
        },
        {
          Icon: Grid3X3,
          labelKey: 'sudokuPuzzle.features.gameplay',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-teal-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-teal-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-teal-400 mb-2',
        },
        {
          Icon: Grid3X3,
          labelKey: 'sudokuPuzzle.features.offline',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-teal-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-teal-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-teal-400 mb-2',
        },
      ];
    case 'tempo-lab-pro':
      return [
        {
          Icon: Music,
          labelKey: 'tempoLabPro.features.tempoPitch',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-violet-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-violet-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-violet-400 mb-2',
        },
        {
          Icon: Music,
          labelKey: 'tempoLabPro.features.tapTempo',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-violet-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-violet-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-violet-400 mb-2',
        },
        {
          Icon: Music,
          labelKey: 'tempoLabPro.features.export',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-violet-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-violet-500/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-violet-400 mb-2',
        },
      ];
    case 'football-trivia':
      return [
        {
          Icon: Trophy,
          labelKey: 'footballTrivia.features.categories',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-blue-600/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-sky-500/45 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-sky-300 mb-2',
        },
        {
          Icon: Trophy,
          labelKey: 'footballTrivia.features.difficulty',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-slate-500/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-slate-400/50 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-slate-200 mb-2',
        },
        {
          Icon: Trophy,
          labelKey: 'footballTrivia.features.stats',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-blue-600/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-sky-500/45 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-sky-300 mb-2',
        },
      ];
    case 'fun-facts-trivia':
      return [
        {
          Icon: Lightbulb,
          labelKey: 'funFactsTrivia.features.categories',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-amber-600/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-amber-400/45 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-amber-300 mb-2',
        },
        {
          Icon: Lightbulb,
          labelKey: 'funFactsTrivia.features.gameplay',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-amber-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-amber-400/40 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-amber-200 mb-2',
        },
        {
          Icon: Lightbulb,
          labelKey: 'funFactsTrivia.features.extras',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-amber-600/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-amber-400/45 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-amber-300 mb-2',
        },
      ];
    case 'track-ledger':
      return [
        {
          Icon: MapPinned,
          labelKey: 'trackLedger.features.gnss',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-cyan-600/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-cyan-400/45 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-cyan-300 mb-2',
        },
        {
          Icon: Share2,
          labelKey: 'trackLedger.features.export',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-cyan-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-cyan-400/40 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-cyan-200 mb-2',
        },
        {
          Icon: MapIcon,
          labelKey: 'trackLedger.features.map',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-cyan-600/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-cyan-400/45 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-cyan-300 mb-2',
        },
      ];
    case 'noise-meter-shusher':
      return [
        {
          Icon: Volume2,
          labelKey: 'noiseMeterShusher.features.meter',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-violet-600/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-violet-400/45 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-violet-300 mb-2',
        },
        {
          Icon: History,
          labelKey: 'noiseMeterShusher.features.history',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-violet-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-violet-400/40 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-fuchsia-200 mb-2',
        },
        {
          Icon: LineChart,
          labelKey: 'noiseMeterShusher.features.premium',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-violet-600/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-violet-400/45 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-violet-300 mb-2',
        },
      ];
    case 'paratrooper-blitz':
      return [
        {
          Icon: Gamepad2,
          labelKey: 'paratrooperBlitz.features.modes',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-orange-600/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-orange-400/45 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-orange-300 mb-2',
        },
        {
          Icon: Target,
          labelKey: 'paratrooperBlitz.features.action',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-orange-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-orange-400/40 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-amber-200 mb-2',
        },
        {
          Icon: Trophy,
          labelKey: 'paratrooperBlitz.features.social',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-orange-600/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-orange-400/45 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-orange-300 mb-2',
        },
      ];
    case 'collagio':
      return [
        {
          Icon: Layers,
          labelKey: 'collagio.features.layouts',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-pink-600/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-pink-400/45 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-pink-300 mb-2',
        },
        {
          Icon: Palette,
          labelKey: 'collagio.features.filters',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-pink-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-pink-400/40 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-pink-200 mb-2',
        },
        {
          Icon: Shield,
          labelKey: 'collagio.features.private',
          cellClass:
            'flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-pink-600/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-pink-400/45 transition-all duration-300',
          iconClassName: 'w-8 h-8 text-pink-300 mb-2',
        },
      ];
    default:
      return null;
  }
}
