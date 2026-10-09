export interface CameraDetection {
  nodeId: string;
  name: string;
  locationCode: string;
  mapCoords: { x: number; y: number };
  timestamp: string;
  relativeTimeMinutes: number;
  wallClockTime: string;
  cosineSimilarity: number;
  threshold: number; // 0.89
  laplacianScore: number;
  fps: number;
  resolution: string;
  transitDistanceMeters: number;
  transitDeltaSeconds: number;
  calculatedVelocityMs: number;
  isPlausible: boolean;
  notes: string;
  probeCropLabel: string;
  cameraFeedLabel: string;
}

export type ReviewStatus = 'awaiting' | 'authorized' | 'dismissed';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'system' | 'authorization' | 'dismissal' | 'reset';
}

export interface IncidentDetails {
  incidentId: string;
  subjectName: string;
  subjectId: string;
  enrolledTimestamp: string;
  reportedMissingLocation: string;
  referenceImagesCount: number;
  galleryEmbeddingDim: number;
  primaryContact: string;
  operatingMode: string;
}

export const DEMO_INCIDENT: IncidentDetails = {
  incidentId: 'FU-2026-084',
  subjectName: 'Alex Mercer',
  subjectId: 'SYN-084',
  enrolledTimestamp: '14:15:00 UTC',
  reportedMissingLocation: 'Municipal Terminal Concourse Area',
  referenceImagesCount: 3,
  galleryEmbeddingDim: 512,
  primaryContact: 'Investigative Task Force Lead #704',
  operatingMode: 'Synthetic Verification Sandbox',
};

export const DEMO_CAMERAS: CameraDetection[] = [
  {
    nodeId: 'C2',
    name: 'Terminal Central Plaza',
    locationCode: 'TCP-L1-HUB',
    mapCoords: { x: 120, y: 190 },
    timestamp: '00:00',
    relativeTimeMinutes: 0,
    wallClockTime: '14:32:10 UTC',
    cosineSimilarity: 0.9412,
    threshold: 0.89,
    laplacianScore: 0.784,
    fps: 2.0,
    resolution: '1920×1080 @ 2fps',
    transitDistanceMeters: 0,
    transitDeltaSeconds: 0,
    calculatedVelocityMs: 0.0,
    isPlausible: true,
    notes: 'Initial high-confidence candidate detection at primary entrance turnstiles. Frontal facial orientation with minimal occlusion.',
    probeCropLabel: 'SCRFD Crop 112×112 (Frontal)',
    cameraFeedLabel: 'CAM-02-CENTRAL-PLAZA-MAIN',
  },
  {
    nodeId: 'C3',
    name: 'South Transit Link Corridor',
    locationCode: 'STC-L1-MID',
    mapCoords: { x: 380, y: 130 },
    timestamp: '00:14',
    relativeTimeMinutes: 14,
    wallClockTime: '14:46:10 UTC',
    cosineSimilarity: 0.9184,
    threshold: 0.89,
    laplacianScore: 0.712,
    fps: 2.0,
    resolution: '1920×1080 @ 2fps',
    transitDistanceMeters: 1176,
    transitDeltaSeconds: 840,
    calculatedVelocityMs: 1.4,
    isPlausible: true,
    notes: 'Candidate traversed mid-concourse link heading northward. Normal walking gait (1.4 m/s ≤ 2.2 m/s physical velocity threshold).',
    probeCropLabel: 'SCRFD Crop 112×112 (3/4 Profile)',
    cameraFeedLabel: 'CAM-03-SOUTH-LINK-CORRIDOR',
  },
  {
    nodeId: 'C1',
    name: 'North Concourse Gate A',
    locationCode: 'NCG-L2-PLT',
    mapCoords: { x: 640, y: 80 },
    timestamp: '00:20',
    relativeTimeMinutes: 20,
    wallClockTime: '14:52:10 UTC',
    cosineSimilarity: 0.8945,
    threshold: 0.89,
    laplacianScore: 0.672,
    fps: 2.0,
    resolution: '1920×1080 @ 2fps',
    transitDistanceMeters: 432,
    transitDeltaSeconds: 360,
    calculatedVelocityMs: 1.2,
    isPlausible: true,
    notes: 'Candidate localized near regional transit boarding gate. Partial lateral pose; cosine similarity exceeds frozen threshold (0.8945 ≥ 0.8900).',
    probeCropLabel: 'SCRFD Crop 112×112 (Lateral Angle)',
    cameraFeedLabel: 'CAM-01-NORTH-CONCOURSE-GATE-A',
  },
];

