export const rovers = [
    "Spirit", "Opportunity", "Curiosity", "Perseverance"
];

export type RoverType = "Spirit"| "Opportunity" | "Curiosity" | "Perseverance";

export const rover_cameras = {
    'Perseverance':[
        'EDL_RUCAM','EDL_RDCAM','EDL_DDCAM','EDL_PUCAM1','EDL_PUCAM2','NAVCAM_LEFT','NAVCAM_RIGHT',
        'MCZ_RIGHT','MCZ_LEFT','FRONT_HAZCAM_LEFT_A','FRONT_HAZCAM_RIGHT_A','REAR_HAZCAM_LEFT',
        'REAR_HAZCAM_RIGHT','SKYCAM','SHERLOC_WATSON'
      ],
        'Curiosity':[
          'FHAZ','RHAZ','MAST','CHEMCAM','MAHLI','MARDI','NAVCAM'
        ],
        'Opportunity':[
          'FHAZ','RHAZ','NAVCAM','PANCAM','MINITES'
        ],
        'Spirit':[
          'FHAZ','RHAZ','NAVCAM','PANCAM','MINITES'
        ]
};