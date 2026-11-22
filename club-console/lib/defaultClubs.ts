import { Club } from "@/types/club";

export function getDefaultClubs(): Club[] {
  return [
  {
    "passwordHash": "332c8b906a8baad86cbe74903a09accb6bcb13adc6ffc54e7fd4582d7510f0dd",
    "account": {
      "status": "approved",
      "officialClubId": "CLB-CS101",
      "approvedAt": "2026-11-01T08:00:00.000Z",
      "rejectionReason": null,
      "lastAppCode": null,
      "lastApprovalCode": null,
      "application": {
        "appId": "APP-CS101",
        "clubName": "Computer Science Society",
        "category": "Academic",
        "adviserFirstName": "Alan",
        "adviserMiddleName": "Mathison",
        "adviserLastName": "Turing",
        "adviserExtName": "",
        "adviserEmail": "cs.society@jdjs.edu",
        "description": "Advancing software craftsmanship, algorithmic thinking, and computer science projects.",
        "accreditationPhotos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "accreditationProof": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "submittedAt": "2026-10-25T08:00:00.000Z"
      }
    },
    "members": [
      {
        "id": "MEM-CS01",
        "firstName": "Alex",
        "middleName": "M.",
        "lastName": "Santos",
        "extName": "",
        "email": "alex.cs@jdjs.edu",
        "program": "BS Computer Science",
        "year": "3rd Year",
        "role": "President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-CS02",
        "firstName": "Jordan",
        "middleName": "A.",
        "lastName": "Cruz",
        "extName": "",
        "email": "jordan.cs@jdjs.edu",
        "program": "BS Computer Science",
        "year": "2nd Year",
        "role": "Vice President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-CS03",
        "firstName": "Maya",
        "middleName": "L.",
        "lastName": "Lin",
        "extName": "",
        "email": "maya.lin@jdjs.edu",
        "program": "BS Computer Science",
        "year": "3rd Year",
        "role": "Secretary",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-CS04",
        "firstName": "Ethan",
        "middleName": "R.",
        "lastName": "Hunt",
        "extName": "",
        "email": "ethan.hunt@jdjs.edu",
        "program": "BS Information Technology",
        "year": "4th Year",
        "role": "Treasurer",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-CS05",
        "firstName": "Samantha",
        "middleName": "G.",
        "lastName": "Rivera",
        "extName": "",
        "email": "samantha.r@jdjs.edu",
        "program": "BS Computer Science",
        "year": "1st Year",
        "role": "Member",
        "joinedAt": "2026-10-28"
      }
    ],
    "events": [
      {
        "id": "EVT-CS01",
        "name": "Algorithm Arena: Winter Code Jam 2027",
        "category": "Academic",
        "description": "Annual algorithmic programming contest and workshop covering graph theory, dynamic programming, and data structures.",
        "date": "2027-01-15",
        "startTime": "09:00",
        "endTime": "16:00",
        "venue": "Computer Science Amphitheater",
        "targetParticipants": 150,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "Google Developer Student Clubs"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-05T08:00:00.000Z",
          "decidedAt": "2026-12-10T10:00:00.000Z"
        }
      },
      {
        "id": "EVT-CS02",
        "name": "Full-Stack Web3 & Cloud Computing Bootcamp",
        "category": "Academic",
        "description": "Hands-on masterclass building distributed cloud microservices and scalable web applications.",
        "date": "2027-02-12",
        "startTime": "13:00",
        "endTime": "18:00",
        "venue": "Engineering Complex - Lab 402",
        "targetParticipants": 100,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [
          {
            "clubId": "CLB-ROB114",
            "clubName": "Robotics & AI Innovation Hub"
          }
        ],
        "externalPartners": [
          "AWS Educate"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-15T09:00:00.000Z",
          "decidedAt": "2026-12-20T14:30:00.000Z"
        }
      },
      {
        "id": "EVT-CS03",
        "name": "JDJS Inter-Collegiate Hackathon 2027",
        "category": "Academic",
        "description": "24-hour campus hackathon solving university community challenges with open-source software.",
        "date": "2027-03-20",
        "startTime": "08:00",
        "endTime": "20:00",
        "venue": "University Auditorium",
        "targetParticipants": 250,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "GitHub Campus Experts"
        ],
        "review": {
          "status": "pending",
          "note": "",
          "submittedAt": "2026-12-28T09:15:00.000Z"
        }
      }
    ],
    "branding": {
      "title": "Club Console",
      "sub": "Computer Science Society"
    }
  },
  {
    "passwordHash": "332c8b906a8baad86cbe74903a09accb6bcb13adc6ffc54e7fd4582d7510f0dd",
    "account": {
      "status": "approved",
      "officialClubId": "CLB-ME102",
      "approvedAt": "2026-11-01T08:00:00.000Z",
      "rejectionReason": null,
      "lastAppCode": null,
      "lastApprovalCode": null,
      "application": {
        "appId": "APP-ME102",
        "clubName": "Society of Mechanical Engineers",
        "category": "Academic",
        "adviserFirstName": "Nikola",
        "adviserMiddleName": "",
        "adviserLastName": "Tesla",
        "adviserExtName": "",
        "adviserEmail": "mech.soc@jdjs.edu",
        "description": "Fostering robotics design, mechanical engineering research, and prototype fabrication.",
        "accreditationPhotos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "accreditationProof": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "submittedAt": "2026-10-25T08:00:00.000Z"
      }
    },
    "members": [
      {
        "id": "MEM-ME01",
        "firstName": "Brandon",
        "middleName": "K.",
        "lastName": "Cole",
        "extName": "",
        "email": "brandon.me@jdjs.edu",
        "program": "BS Mechanical Engineering",
        "year": "4th Year",
        "role": "President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-ME02",
        "firstName": "Jordan",
        "middleName": "A.",
        "lastName": "Cruz",
        "extName": "",
        "email": "jordan.me@jdjs.edu",
        "program": "BS Mechanical Engineering",
        "year": "3rd Year",
        "role": "Vice President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-ME03",
        "firstName": "Dave",
        "middleName": "B.",
        "lastName": "Bautista",
        "extName": "",
        "email": "dave.bautista@jdjs.edu",
        "program": "BS Mechanical Engineering",
        "year": "3rd Year",
        "role": "Treasurer",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-ME04",
        "firstName": "Alyssa",
        "middleName": "V.",
        "lastName": "Vance",
        "extName": "",
        "email": "alyssa.v@jdjs.edu",
        "program": "BS Mechanical Engineering",
        "year": "2nd Year",
        "role": "Committee Head",
        "joinedAt": "2026-10-27"
      }
    ],
    "events": [
      {
        "id": "EVT-ME01",
        "name": "CAD & 3D Prototyping Masterclass",
        "category": "Academic",
        "description": "Hands-on SolidWorks and generative design prototyping session for engineering students.",
        "date": "2027-01-18",
        "startTime": "10:00",
        "endTime": "15:00",
        "venue": "Mechanical Workshop Bldg B",
        "targetParticipants": 80,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "Autodesk Student Community"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-08T09:00:00.000Z",
          "decidedAt": "2026-12-12T11:00:00.000Z"
        }
      },
      {
        "id": "EVT-ME02",
        "name": "Kinetic Machine Expo & SumoBot Challenge",
        "category": "Academic",
        "description": "Showcase of student-built gearboxes, pneumatic lifts, and mini SumoBot autonomous ring matches.",
        "date": "2027-02-26",
        "startTime": "09:00",
        "endTime": "17:00",
        "venue": "Engineering Courtyard",
        "targetParticipants": 180,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [
          {
            "clubId": "CLB-ROB114",
            "clubName": "Robotics & AI Innovation Hub"
          }
        ],
        "externalPartners": [
          "FabLab Manila"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-18T10:00:00.000Z",
          "decidedAt": "2026-12-22T08:00:00.000Z"
        }
      }
    ],
    "branding": {
      "title": "Club Console",
      "sub": "Society of Mechanical Engineers"
    }
  },
  {
    "passwordHash": "332c8b906a8baad86cbe74903a09accb6bcb13adc6ffc54e7fd4582d7510f0dd",
    "account": {
      "status": "approved",
      "officialClubId": "CLB-BIO103",
      "approvedAt": "2026-11-01T08:00:00.000Z",
      "rejectionReason": null,
      "lastAppCode": null,
      "lastApprovalCode": null,
      "application": {
        "appId": "APP-BIO103",
        "clubName": "Biomedical Sciences Guild",
        "category": "Academic",
        "adviserFirstName": "Rosalind",
        "adviserMiddleName": "",
        "adviserLastName": "Franklin",
        "adviserExtName": "",
        "adviserEmail": "biomed.guild@jdjs.edu",
        "description": "Exploring modern biotechnology, microbiology research, and clinical sciences.",
        "accreditationPhotos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "accreditationProof": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "submittedAt": "2026-10-25T08:00:00.000Z"
      }
    },
    "members": [
      {
        "id": "MEM-BIO01",
        "firstName": "Chloe",
        "middleName": "S.",
        "lastName": "Diaz",
        "extName": "",
        "email": "chloe.bio@jdjs.edu",
        "program": "BS Biology",
        "year": "3rd Year",
        "role": "President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-BIO02",
        "firstName": "Jordan",
        "middleName": "A.",
        "lastName": "Cruz",
        "extName": "",
        "email": "jordan.bio@jdjs.edu",
        "program": "BS Biology",
        "year": "2nd Year",
        "role": "Vice President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-BIO03",
        "firstName": "Kevin",
        "middleName": "C.",
        "lastName": "Chen",
        "extName": "",
        "email": "kevin.chen@jdjs.edu",
        "program": "BS Biology",
        "year": "3rd Year",
        "role": "Secretary",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-BIO04",
        "firstName": "Nicole",
        "middleName": "M.",
        "lastName": "Ramos",
        "extName": "",
        "email": "nicole.ramos@jdjs.edu",
        "program": "BS Medical Technology",
        "year": "4th Year",
        "role": "Treasurer",
        "joinedAt": "2026-10-27"
      }
    ],
    "events": [
      {
        "id": "EVT-BIO01",
        "name": "Frontiers in Gene Therapy & Bioinformatics Seminar",
        "category": "Academic",
        "description": "Guest lectures by leading geneticists on CRISPR applications and molecular bioinformatics tools.",
        "date": "2027-01-22",
        "startTime": "08:30",
        "endTime": "12:30",
        "venue": "Health Sciences Wing Rm 101",
        "targetParticipants": 120,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-10T10:00:00.000Z",
          "decidedAt": "2026-12-14T09:30:00.000Z"
        }
      },
      {
        "id": "EVT-BIO02",
        "name": "Campus Health & Wellness Screening Drive",
        "category": "Community Service",
        "description": "Free glucose checks, blood pressure monitoring, and health education consultations for the campus.",
        "date": "2027-02-19",
        "startTime": "09:00",
        "endTime": "16:00",
        "venue": "Science Amphitheater",
        "targetParticipants": 200,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [
          {
            "clubId": "CLB-RCY108",
            "clubName": "Red Cross Youth Chapter"
          }
        ],
        "externalPartners": [
          "University Health Services"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-16T11:00:00.000Z",
          "decidedAt": "2026-12-20T10:00:00.000Z"
        }
      }
    ],
    "branding": {
      "title": "Club Console",
      "sub": "Biomedical Sciences Guild"
    }
  },
  {
    "passwordHash": "332c8b906a8baad86cbe74903a09accb6bcb13adc6ffc54e7fd4582d7510f0dd",
    "account": {
      "status": "approved",
      "officialClubId": "CLB-THT104",
      "approvedAt": "2026-11-01T08:00:00.000Z",
      "rejectionReason": null,
      "lastAppCode": null,
      "lastApprovalCode": null,
      "application": {
        "appId": "APP-THT104",
        "clubName": "JDJS University Theatre Guild",
        "category": "Arts & Culture",
        "adviserFirstName": "Arthur",
        "adviserMiddleName": "",
        "adviserLastName": "Miller",
        "adviserExtName": "",
        "adviserEmail": "theatre.guild@jdjs.edu",
        "description": "Promoting student-led theatrical plays, drama workshops, and expressive performing arts.",
        "accreditationPhotos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "accreditationProof": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "submittedAt": "2026-10-25T08:00:00.000Z"
      }
    },
    "members": [
      {
        "id": "MEM-THT01",
        "firstName": "Daniel",
        "middleName": "R.",
        "lastName": "Reyes",
        "extName": "",
        "email": "daniel.theatre@jdjs.edu",
        "program": "BA Communication",
        "year": "2nd Year",
        "role": "President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-THT02",
        "firstName": "Jordan",
        "middleName": "A.",
        "lastName": "Cruz",
        "extName": "",
        "email": "jordan.theatre@jdjs.edu",
        "program": "BA Theatre Arts",
        "year": "3rd Year",
        "role": "Vice President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-THT03",
        "firstName": "Beatrice",
        "middleName": "L.",
        "lastName": "Gomez",
        "extName": "",
        "email": "beatrice.gomez@jdjs.edu",
        "program": "BA Literature",
        "year": "2nd Year",
        "role": "Secretary",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-THT04",
        "firstName": "Leo",
        "middleName": "P.",
        "lastName": "Martinez",
        "extName": "",
        "email": "leo.martinez@jdjs.edu",
        "program": "BA Theatre Arts",
        "year": "4th Year",
        "role": "Treasurer",
        "joinedAt": "2026-10-27"
      }
    ],
    "events": [
      {
        "id": "EVT-THT01",
        "name": "Spring Play Auditions & Stagecraft Workshop",
        "category": "Arts & Culture",
        "description": "Open casting call and technical workshop covering lighting, sound production, and improvisational acting.",
        "date": "2027-01-14",
        "startTime": "16:00",
        "endTime": "20:00",
        "venue": "Blackbox Studio Hall",
        "targetParticipants": 90,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-10T14:00:00.000Z",
          "decidedAt": "2026-12-15T15:00:00.000Z"
        }
      },
      {
        "id": "EVT-THT02",
        "name": "A Midsummer Night's Adaptation - Gala Premiere",
        "category": "Arts & Culture",
        "description": "Original modern theatrical adaptation of Shakespeare's classic comedy performed live with orchestra accompaniment.",
        "date": "2027-02-27",
        "startTime": "18:00",
        "endTime": "21:30",
        "venue": "University Auditorium",
        "targetParticipants": 300,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [
          {
            "clubId": "CLB-MUS105",
            "clubName": "Acoustic & Classical Music Society"
          }
        ],
        "externalPartners": [
          "City Cultural Center"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-20T11:00:00.000Z",
          "decidedAt": "2026-12-24T16:00:00.000Z"
        }
      }
    ],
    "branding": {
      "title": "Club Console",
      "sub": "JDJS University Theatre Guild"
    }
  },
  {
    "passwordHash": "332c8b906a8baad86cbe74903a09accb6bcb13adc6ffc54e7fd4582d7510f0dd",
    "account": {
      "status": "approved",
      "officialClubId": "CLB-MUS105",
      "approvedAt": "2026-11-01T08:00:00.000Z",
      "rejectionReason": null,
      "lastAppCode": null,
      "lastApprovalCode": null,
      "application": {
        "appId": "APP-MUS105",
        "clubName": "Acoustic & Classical Music Society",
        "category": "Arts & Culture",
        "adviserFirstName": "Clara",
        "adviserMiddleName": "",
        "adviserLastName": "Schumann",
        "adviserExtName": "",
        "adviserEmail": "music.society@jdjs.edu",
        "description": "Organizing acoustic jams, choir recitals, orchestra performances, and musical growth.",
        "accreditationPhotos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "accreditationProof": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "submittedAt": "2026-10-25T08:00:00.000Z"
      }
    },
    "members": [
      {
        "id": "MEM-MUS01",
        "firstName": "Ella",
        "middleName": "J.",
        "lastName": "Montgomery",
        "extName": "",
        "email": "ella.music@jdjs.edu",
        "program": "BM Music Education",
        "year": "3rd Year",
        "role": "President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-MUS02",
        "firstName": "Jordan",
        "middleName": "A.",
        "lastName": "Cruz",
        "extName": "",
        "email": "jordan.music@jdjs.edu",
        "program": "BM Music Performance",
        "year": "2nd Year",
        "role": "Vice President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-MUS03",
        "firstName": "Francis",
        "middleName": "D.",
        "lastName": "Drake",
        "extName": "",
        "email": "francis.drake@jdjs.edu",
        "program": "BM Composition",
        "year": "3rd Year",
        "role": "Secretary",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-MUS04",
        "firstName": "Valerie",
        "middleName": "T.",
        "lastName": "Tan",
        "extName": "",
        "email": "valerie.tan@jdjs.edu",
        "program": "BM Music Education",
        "year": "4th Year",
        "role": "Treasurer",
        "joinedAt": "2026-10-27"
      }
    ],
    "events": [
      {
        "id": "EVT-MUS01",
        "name": "Chamber Music & Acoustic Winter Serenade",
        "category": "Arts & Culture",
        "description": "Student string quartets, acoustic ensembles, and classical solo performances in an intimate setting.",
        "date": "2027-01-20",
        "startTime": "17:00",
        "endTime": "20:00",
        "venue": "Conservatory Recital Hall",
        "targetParticipants": 130,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-12T10:00:00.000Z",
          "decidedAt": "2026-12-16T11:00:00.000Z"
        }
      },
      {
        "id": "EVT-MUS02",
        "name": "Open Mic & Unplugged Campus Jam Session",
        "category": "Arts & Culture",
        "description": "Casual outdoor afternoon acoustic open mic session for singer-songwriters across all colleges.",
        "date": "2027-03-05",
        "startTime": "15:00",
        "endTime": "19:00",
        "venue": "Campus Gazebo & Quad",
        "targetParticipants": 160,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [],
        "review": {
          "status": "pending",
          "note": "",
          "submittedAt": "2026-12-27T13:00:00.000Z"
        }
      }
    ],
    "branding": {
      "title": "Club Console",
      "sub": "Acoustic & Classical Music Society"
    }
  },
  {
    "passwordHash": "332c8b906a8baad86cbe74903a09accb6bcb13adc6ffc54e7fd4582d7510f0dd",
    "account": {
      "status": "approved",
      "officialClubId": "CLB-ART106",
      "approvedAt": "2026-11-01T08:00:00.000Z",
      "rejectionReason": null,
      "lastAppCode": null,
      "lastApprovalCode": null,
      "application": {
        "appId": "APP-ART106",
        "clubName": "Fine Arts & Creative Media Guild",
        "category": "Arts & Culture",
        "adviserFirstName": "Leonardo",
        "adviserMiddleName": "",
        "adviserLastName": "Cruz",
        "adviserExtName": "",
        "adviserEmail": "finearts@jdjs.edu",
        "description": "Developing digital design, traditional painting, photography, and mixed media showcases.",
        "accreditationPhotos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "accreditationProof": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "submittedAt": "2026-10-25T08:00:00.000Z"
      }
    },
    "members": [
      {
        "id": "MEM-ART01",
        "firstName": "Faith",
        "middleName": "A.",
        "lastName": "Valdez",
        "extName": "",
        "email": "faith.arts@jdjs.edu",
        "program": "BFA Visual Communication",
        "year": "2nd Year",
        "role": "President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-ART02",
        "firstName": "Jordan",
        "middleName": "A.",
        "lastName": "Cruz",
        "extName": "",
        "email": "jordan.arts@jdjs.edu",
        "program": "BFA Painting",
        "year": "3rd Year",
        "role": "Vice President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-ART03",
        "firstName": "Marcus",
        "middleName": "B.",
        "lastName": "Bell",
        "extName": "",
        "email": "marcus.bell@jdjs.edu",
        "program": "BFA Graphic Design",
        "year": "2nd Year",
        "role": "Secretary",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-ART04",
        "firstName": "Chloe",
        "middleName": "K.",
        "lastName": "Kim",
        "extName": "",
        "email": "chloe.kim@jdjs.edu",
        "program": "BFA Visual Communication",
        "year": "4th Year",
        "role": "Treasurer",
        "joinedAt": "2026-10-27"
      }
    ],
    "events": [
      {
        "id": "EVT-ART01",
        "name": "Perspectives: Student Visual Arts Exhibition",
        "category": "Arts & Culture",
        "description": "Curated gallery showcasing digital paintings, watercolor illustrations, typography, and sculpture pieces.",
        "date": "2027-01-25",
        "startTime": "10:00",
        "endTime": "17:00",
        "venue": "Creative Hub Gallery Lounge",
        "targetParticipants": 175,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-14T09:00:00.000Z",
          "decidedAt": "2026-12-18T14:00:00.000Z"
        }
      },
      {
        "id": "EVT-ART02",
        "name": "Digital Illustration & UI Graphic Design Workshop",
        "category": "Special Interest",
        "description": "Hands-on vector illustration and user-interface asset design clinic using Figma and tablet styluses.",
        "date": "2027-02-17",
        "startTime": "14:00",
        "endTime": "18:00",
        "venue": "Art Studio 204",
        "targetParticipants": 75,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "Adobe Creative Campus"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-19T10:00:00.000Z",
          "decidedAt": "2026-12-22T09:00:00.000Z"
        }
      }
    ],
    "branding": {
      "title": "Club Console",
      "sub": "Fine Arts & Creative Media Guild"
    }
  },
  {
    "passwordHash": "332c8b906a8baad86cbe74903a09accb6bcb13adc6ffc54e7fd4582d7510f0dd",
    "account": {
      "status": "approved",
      "officialClubId": "CLB-SRV107",
      "approvedAt": "2026-11-01T08:00:00.000Z",
      "rejectionReason": null,
      "lastAppCode": null,
      "lastApprovalCode": null,
      "application": {
        "appId": "APP-SRV107",
        "clubName": "Campus Community Outreach Network",
        "category": "Community Service",
        "adviserFirstName": "Jane",
        "adviserMiddleName": "",
        "adviserLastName": "Addams",
        "adviserExtName": "",
        "adviserEmail": "outreach.network@jdjs.edu",
        "description": "Coordinating humanitarian relief, community feeding drives, and educational tutoring programs.",
        "accreditationPhotos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "accreditationProof": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "submittedAt": "2026-10-25T08:00:00.000Z"
      }
    },
    "members": [
      {
        "id": "MEM-SRV01",
        "firstName": "Gabriel",
        "middleName": "T.",
        "lastName": "Torres",
        "extName": "",
        "email": "gabriel.outreach@jdjs.edu",
        "program": "BS Social Work",
        "year": "4th Year",
        "role": "President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-SRV02",
        "firstName": "Jordan",
        "middleName": "A.",
        "lastName": "Cruz",
        "extName": "",
        "email": "jordan.outreach@jdjs.edu",
        "program": "BS Community Development",
        "year": "3rd Year",
        "role": "Vice President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-SRV03",
        "firstName": "Andrea",
        "middleName": "S.",
        "lastName": "Santos",
        "extName": "",
        "email": "andrea.santos@jdjs.edu",
        "program": "BS Psychology",
        "year": "2nd Year",
        "role": "Secretary",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-SRV04",
        "firstName": "Robert",
        "middleName": "K.",
        "lastName": "King",
        "extName": "",
        "email": "robert.king@jdjs.edu",
        "program": "BS Social Work",
        "year": "3rd Year",
        "role": "Treasurer",
        "joinedAt": "2026-10-27"
      }
    ],
    "events": [
      {
        "id": "EVT-SRV01",
        "name": "Project Dunong: Literacy & School Supplies Outreach",
        "category": "Community Service",
        "description": "Distribution of learning kits, reading tutorials, and story-telling workshops for local public school students.",
        "date": "2027-01-16",
        "startTime": "08:00",
        "endTime": "14:00",
        "venue": "Barangay San Jose Community Hall",
        "targetParticipants": 150,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "Local City DepEd Division"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-10T08:00:00.000Z",
          "decidedAt": "2026-12-15T08:30:00.000Z"
        }
      },
      {
        "id": "EVT-SRV02",
        "name": "Warmth for All: Winter Clothing & Blanket Drive",
        "category": "Community Service",
        "description": "Collecting, sorting, and delivering warm clothing and bedding essentials to partner community shelters.",
        "date": "2027-02-14",
        "startTime": "09:00",
        "endTime": "15:00",
        "venue": "Student Center Lobby",
        "targetParticipants": 220,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [
          {
            "clubId": "CLB-ECO109",
            "clubName": "Green Earth Eco Alliance"
          }
        ],
        "externalPartners": [
          "Civic Welfare Action Group"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-17T09:00:00.000Z",
          "decidedAt": "2026-12-21T11:00:00.000Z"
        }
      }
    ],
    "branding": {
      "title": "Club Console",
      "sub": "Campus Community Outreach Network"
    }
  },
  {
    "passwordHash": "332c8b906a8baad86cbe74903a09accb6bcb13adc6ffc54e7fd4582d7510f0dd",
    "account": {
      "status": "approved",
      "officialClubId": "CLB-RCY108",
      "approvedAt": "2026-11-01T08:00:00.000Z",
      "rejectionReason": null,
      "lastAppCode": null,
      "lastApprovalCode": null,
      "application": {
        "appId": "APP-RCY108",
        "clubName": "Red Cross Youth Chapter",
        "category": "Community Service",
        "adviserFirstName": "Henry",
        "adviserMiddleName": "",
        "adviserLastName": "Dunant",
        "adviserExtName": "",
        "adviserEmail": "rcy.chapter@jdjs.edu",
        "description": "Emergency disaster preparedness, blood donation drives, and certified youth first-aid training.",
        "accreditationPhotos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "accreditationProof": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "submittedAt": "2026-10-25T08:00:00.000Z"
      }
    },
    "members": [
      {
        "id": "MEM-RCY01",
        "firstName": "Hannah",
        "middleName": "L.",
        "lastName": "Flores",
        "extName": "",
        "email": "hannah.rcy@jdjs.edu",
        "program": "BS Nursing",
        "year": "3rd Year",
        "role": "President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-RCY02",
        "firstName": "Jordan",
        "middleName": "A.",
        "lastName": "Cruz",
        "extName": "",
        "email": "jordan.rcy@jdjs.edu",
        "program": "BS Medical Technology",
        "year": "3rd Year",
        "role": "Vice President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-RCY03",
        "firstName": "Lucas",
        "middleName": "M.",
        "lastName": "Moreno",
        "extName": "",
        "email": "lucas.moreno@jdjs.edu",
        "program": "BS Nursing",
        "year": "2nd Year",
        "role": "Secretary",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-RCY04",
        "firstName": "Emily",
        "middleName": "W.",
        "lastName": "Watson",
        "extName": "",
        "email": "emily.watson@jdjs.edu",
        "program": "BS Pharmacy",
        "year": "4th Year",
        "role": "Treasurer",
        "joinedAt": "2026-10-27"
      }
    ],
    "events": [
      {
        "id": "EVT-RCY01",
        "name": "Annual University Blood Donation Campaign: Give Life",
        "category": "Community Service",
        "description": "Campus-wide voluntary bloodletting activity in cooperation with the Philippine Red Cross.",
        "date": "2027-01-27",
        "startTime": "08:00",
        "endTime": "17:00",
        "venue": "Grand Gymnasium Mezzanine",
        "targetParticipants": 250,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "Red Cross Chapter"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-11T12:00:00.000Z",
          "decidedAt": "2026-12-16T13:00:00.000Z"
        }
      },
      {
        "id": "EVT-RCY02",
        "name": "Basic Life Support & Disaster First Aid Certification",
        "category": "Community Service",
        "description": "Certified training on CPR, choking relief, bandaging techniques, and campus emergency triage.",
        "date": "2027-02-20",
        "startTime": "09:00",
        "endTime": "16:00",
        "venue": "Auditorium Multi-Purpose Hall",
        "targetParticipants": 100,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "Disaster Risk Reduction Unit"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-18T10:00:00.000Z",
          "decidedAt": "2026-12-23T10:00:00.000Z"
        }
      }
    ],
    "branding": {
      "title": "Club Console",
      "sub": "Red Cross Youth Chapter"
    }
  },
  {
    "passwordHash": "332c8b906a8baad86cbe74903a09accb6bcb13adc6ffc54e7fd4582d7510f0dd",
    "account": {
      "status": "approved",
      "officialClubId": "CLB-ECO109",
      "approvedAt": "2026-11-01T08:00:00.000Z",
      "rejectionReason": null,
      "lastAppCode": null,
      "lastApprovalCode": null,
      "application": {
        "appId": "APP-ECO109",
        "clubName": "Green Earth Eco Alliance",
        "category": "Environmental",
        "adviserFirstName": "Rachel",
        "adviserMiddleName": "",
        "adviserLastName": "Carson",
        "adviserExtName": "",
        "adviserEmail": "eco.alliance@jdjs.edu",
        "description": "Campus waste reduction, urban gardening, tree-planting campaigns, and climate advocacy.",
        "accreditationPhotos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "accreditationProof": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "submittedAt": "2026-10-25T08:00:00.000Z"
      }
    },
    "members": [
      {
        "id": "MEM-ECO01",
        "firstName": "Ian",
        "middleName": "C.",
        "lastName": "Mendoza",
        "extName": "",
        "email": "ian.eco@jdjs.edu",
        "program": "BS Environmental Science",
        "year": "2nd Year",
        "role": "President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-ECO02",
        "firstName": "Jordan",
        "middleName": "A.",
        "lastName": "Cruz",
        "extName": "",
        "email": "jordan.eco@jdjs.edu",
        "program": "BS Agriculture",
        "year": "3rd Year",
        "role": "Vice President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-ECO03",
        "firstName": "Patrick",
        "middleName": "E.",
        "lastName": "Evans",
        "extName": "",
        "email": "patrick.evans@jdjs.edu",
        "program": "BS Environmental Science",
        "year": "2nd Year",
        "role": "Secretary",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-ECO04",
        "firstName": "Michelle",
        "middleName": "W.",
        "lastName": "Wu",
        "extName": "",
        "email": "michelle.wu@jdjs.edu",
        "program": "BS Forestry",
        "year": "4th Year",
        "role": "Treasurer",
        "joinedAt": "2026-10-27"
      }
    ],
    "events": [
      {
        "id": "EVT-ECO01",
        "name": "Campus Greening & Native Tree Planting Drive",
        "category": "Environmental",
        "description": "Planting 300 native saplings along the campus perimeter to support biodiversity and urban canopy cover.",
        "date": "2027-01-23",
        "startTime": "07:00",
        "endTime": "12:00",
        "venue": "University Botanical Gardens & Riverbank",
        "targetParticipants": 140,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "DENR Youth Desk"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-10T08:00:00.000Z",
          "decidedAt": "2026-12-14T08:00:00.000Z"
        }
      },
      {
        "id": "EVT-ECO02",
        "name": "Zero Waste Campus Bazaar & Upcycling Fair",
        "category": "Environmental",
        "description": "Eco-friendly market promoting thrift clothing swaps, reusable wares, compost kits, and zero plastic packaging.",
        "date": "2027-02-24",
        "startTime": "10:00",
        "endTime": "16:00",
        "venue": "Campus Central Walkway",
        "targetParticipants": 180,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "EcoWaste Coalition"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-15T14:00:00.000Z",
          "decidedAt": "2026-12-19T15:00:00.000Z"
        }
      }
    ],
    "branding": {
      "title": "Club Console",
      "sub": "Green Earth Eco Alliance"
    }
  },
  {
    "passwordHash": "332c8b906a8baad86cbe74903a09accb6bcb13adc6ffc54e7fd4582d7510f0dd",
    "account": {
      "status": "approved",
      "officialClubId": "CLB-DEB110",
      "approvedAt": "2026-11-01T08:00:00.000Z",
      "rejectionReason": null,
      "lastAppCode": null,
      "lastApprovalCode": null,
      "application": {
        "appId": "APP-DEB110",
        "clubName": "JDJS Debate Society",
        "category": "Student Governance",
        "adviserFirstName": "Clarence",
        "adviserMiddleName": "",
        "adviserLastName": "Darrow",
        "adviserExtName": "",
        "adviserEmail": "debate.soc@jdjs.edu",
        "description": "Training student debaters in British Parliamentary and Asian Parliamentary debate formats.",
        "accreditationPhotos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "accreditationProof": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "submittedAt": "2026-10-25T08:00:00.000Z"
      }
    },
    "members": [
      {
        "id": "MEM-DEB01",
        "firstName": "Julia",
        "middleName": "M.",
        "lastName": "Garcia",
        "extName": "",
        "email": "julia.debate@jdjs.edu",
        "program": "BA Political Science",
        "year": "4th Year",
        "role": "President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-DEB02",
        "firstName": "Jordan",
        "middleName": "A.",
        "lastName": "Cruz",
        "extName": "",
        "email": "jordan.debate@jdjs.edu",
        "program": "BA Philosophy",
        "year": "3rd Year",
        "role": "Vice President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-DEB03",
        "firstName": "Simon",
        "middleName": "L.",
        "lastName": "Lee",
        "extName": "",
        "email": "simon.lee@jdjs.edu",
        "program": "BA Legal Management",
        "year": "2nd Year",
        "role": "Secretary",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-DEB04",
        "firstName": "Rachel",
        "middleName": "F.",
        "lastName": "Foster",
        "extName": "",
        "email": "rachel.foster@jdjs.edu",
        "program": "BA Political Science",
        "year": "3rd Year",
        "role": "Treasurer",
        "joinedAt": "2026-10-27"
      }
    ],
    "events": [
      {
        "id": "EVT-DEB01",
        "name": "Chancellor's Cup: Inter-College Parliamentary Debate",
        "category": "Student Governance",
        "description": "Debating pressing national issues, digital privacy rights, and ethical governance in British Parliamentary format.",
        "date": "2027-01-19",
        "startTime": "13:00",
        "endTime": "19:00",
        "venue": "Moot Court & Law Bldg Room 201",
        "targetParticipants": 110,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "National Debate Union"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-12T11:00:00.000Z",
          "decidedAt": "2026-12-17T14:00:00.000Z"
        }
      },
      {
        "id": "EVT-DEB02",
        "name": "Public Speaking & Argumentation Bootcamp",
        "category": "Student Governance",
        "description": "Intensive training on speech structure, rebuttal techniques, poise, and impromptu speaking.",
        "date": "2027-02-23",
        "startTime": "14:00",
        "endTime": "17:30",
        "venue": "Student Union Conference Hall",
        "targetParticipants": 85,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [
          {
            "clubId": "CLB-LDR111",
            "clubName": "Student Council Leadership League"
          }
        ],
        "externalPartners": [
          "Toastmasters Youth"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-18T10:00:00.000Z",
          "decidedAt": "2026-12-22T10:00:00.000Z"
        }
      }
    ],
    "branding": {
      "title": "Club Console",
      "sub": "JDJS Debate Society"
    }
  },
  {
    "passwordHash": "332c8b906a8baad86cbe74903a09accb6bcb13adc6ffc54e7fd4582d7510f0dd",
    "account": {
      "status": "approved",
      "officialClubId": "CLB-LDR111",
      "approvedAt": "2026-11-01T08:00:00.000Z",
      "rejectionReason": null,
      "lastAppCode": null,
      "lastApprovalCode": null,
      "application": {
        "appId": "APP-LDR111",
        "clubName": "Student Council Leadership League",
        "category": "Student Governance",
        "adviserFirstName": "Nelson",
        "adviserMiddleName": "",
        "adviserLastName": "Reyes",
        "adviserExtName": "",
        "adviserEmail": "leadership.league@jdjs.edu",
        "description": "Empowering university student council leaders with governance and advocacy skills.",
        "accreditationPhotos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "accreditationProof": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "submittedAt": "2026-10-25T08:00:00.000Z"
      }
    },
    "members": [
      {
        "id": "MEM-LDR01",
        "firstName": "Kevin",
        "middleName": "B.",
        "lastName": "Navarro",
        "extName": "",
        "email": "kevin.leadership@jdjs.edu",
        "program": "BA Public Administration",
        "year": "3rd Year",
        "role": "President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-LDR02",
        "firstName": "Jordan",
        "middleName": "A.",
        "lastName": "Cruz",
        "extName": "",
        "email": "jordan.leadership@jdjs.edu",
        "program": "BA Economics",
        "year": "3rd Year",
        "role": "Vice President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-LDR03",
        "firstName": "Diana",
        "middleName": "P.",
        "lastName": "Prince",
        "extName": "",
        "email": "diana.prince@jdjs.edu",
        "program": "BA Political Science",
        "year": "2nd Year",
        "role": "Secretary",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-LDR04",
        "firstName": "Ryan",
        "middleName": "C.",
        "lastName": "Cooper",
        "extName": "",
        "email": "ryan.cooper@jdjs.edu",
        "program": "BS Accountancy",
        "year": "4th Year",
        "role": "Treasurer",
        "joinedAt": "2026-10-27"
      }
    ],
    "events": [
      {
        "id": "EVT-LDR01",
        "name": "Youth Leadership & Civic Engagement Summit 2027",
        "category": "Student Governance",
        "description": "Keynote sessions by student council representatives on participatory governance and student rights representation.",
        "date": "2027-01-12",
        "startTime": "09:00",
        "endTime": "16:00",
        "venue": "University International Convention Center",
        "targetParticipants": 280,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "National Youth Council"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-07T08:00:00.000Z",
          "decidedAt": "2026-12-11T09:00:00.000Z"
        }
      },
      {
        "id": "EVT-LDR02",
        "name": "Campus Townhall: Student Rights & Campus Policies",
        "category": "Student Governance",
        "description": "Open forum between student organization leaders and university administrative officers regarding campus life.",
        "date": "2027-03-10",
        "startTime": "13:00",
        "endTime": "17:00",
        "venue": "University Amphitheater",
        "targetParticipants": 200,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [],
        "review": {
          "status": "pending",
          "note": "",
          "submittedAt": "2026-12-29T10:00:00.000Z"
        }
      }
    ],
    "branding": {
      "title": "Club Console",
      "sub": "Student Council Leadership League"
    }
  },
  {
    "passwordHash": "332c8b906a8baad86cbe74903a09accb6bcb13adc6ffc54e7fd4582d7510f0dd",
    "account": {
      "status": "approved",
      "officialClubId": "CLB-ESP112",
      "approvedAt": "2026-11-01T08:00:00.000Z",
      "rejectionReason": null,
      "lastAppCode": null,
      "lastApprovalCode": null,
      "application": {
        "appId": "APP-ESP112",
        "clubName": "Varsity Esports & Gaming Guild",
        "category": "Sports & Recreation",
        "adviserFirstName": "Marcus",
        "adviserMiddleName": "",
        "adviserLastName": "Thorne",
        "adviserExtName": "",
        "adviserEmail": "esports.guild@jdjs.edu",
        "description": "Collegiate gaming leagues, team tournaments, and competitive gaming production.",
        "accreditationPhotos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "accreditationProof": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "submittedAt": "2026-10-25T08:00:00.000Z"
      }
    },
    "members": [
      {
        "id": "MEM-ESP01",
        "firstName": "Liam",
        "middleName": "D.",
        "lastName": "Walker",
        "extName": "",
        "email": "liam.esports@jdjs.edu",
        "program": "BS Information Technology",
        "year": "2nd Year",
        "role": "President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-ESP02",
        "firstName": "Jordan",
        "middleName": "A.",
        "lastName": "Cruz",
        "extName": "",
        "email": "jordan.esports@jdjs.edu",
        "program": "BS Computer Science",
        "year": "3rd Year",
        "role": "Vice President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-ESP03",
        "firstName": "Felix",
        "middleName": "C.",
        "lastName": "Chen",
        "extName": "",
        "email": "felix.chen@jdjs.edu",
        "program": "BS Information Technology",
        "year": "2nd Year",
        "role": "Secretary",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-ESP04",
        "firstName": "Jake",
        "middleName": "M.",
        "lastName": "Miller",
        "extName": "",
        "email": "jake.miller@jdjs.edu",
        "program": "BS Computer Engineering",
        "year": "4th Year",
        "role": "Treasurer",
        "joinedAt": "2026-10-27"
      }
    ],
    "events": [
      {
        "id": "EVT-ESP01",
        "name": "JDJS Winter Invitational: Collegiate Esports Championship",
        "category": "Sports & Recreation",
        "description": "Inter-collegiate tournament in Valorant and Mobile Legends with live streaming production and casting commentary.",
        "date": "2027-01-29",
        "startTime": "10:00",
        "endTime": "20:00",
        "venue": "University Student Pavilion Arena",
        "targetParticipants": 300,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "Razer Campus Gaming"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-14T11:00:00.000Z",
          "decidedAt": "2026-12-18T16:00:00.000Z"
        }
      },
      {
        "id": "EVT-ESP02",
        "name": "Game Design & Shoutcasting Production Workshop",
        "category": "Sports & Recreation",
        "description": "Behind-the-scenes seminar on esports live broadcasting, OBS production, audio engineering, and casting.",
        "date": "2027-02-18",
        "startTime": "13:00",
        "endTime": "17:00",
        "venue": "Multimedia Lab 3",
        "targetParticipants": 70,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "AcadArena"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-19T09:00:00.000Z",
          "decidedAt": "2026-12-23T11:00:00.000Z"
        }
      }
    ],
    "branding": {
      "title": "Club Console",
      "sub": "Varsity Esports & Gaming Guild"
    }
  },
  {
    "passwordHash": "332c8b906a8baad86cbe74903a09accb6bcb13adc6ffc54e7fd4582d7510f0dd",
    "account": {
      "status": "approved",
      "officialClubId": "CLB-SPT113",
      "approvedAt": "2026-11-01T08:00:00.000Z",
      "rejectionReason": null,
      "lastAppCode": null,
      "lastApprovalCode": null,
      "application": {
        "appId": "APP-SPT113",
        "clubName": "Campus Badminton & Racquet Club",
        "category": "Sports & Recreation",
        "adviserFirstName": "Sarah",
        "adviserMiddleName": "",
        "adviserLastName": "Lin",
        "adviserExtName": "",
        "adviserEmail": "badminton.club@jdjs.edu",
        "description": "Racquet sports training, collegiate badminton friendlies, and fitness tournaments.",
        "accreditationPhotos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "accreditationProof": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "submittedAt": "2026-10-25T08:00:00.000Z"
      }
    },
    "members": [
      {
        "id": "MEM-SPT01",
        "firstName": "Mia",
        "middleName": "C.",
        "lastName": "Castillo",
        "extName": "",
        "email": "mia.badminton@jdjs.edu",
        "program": "BS Sports Science",
        "year": "3rd Year",
        "role": "President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-SPT02",
        "firstName": "Jordan",
        "middleName": "A.",
        "lastName": "Cruz",
        "extName": "",
        "email": "jordan.badminton@jdjs.edu",
        "program": "BS Physical Education",
        "year": "2nd Year",
        "role": "Vice President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-SPT03",
        "firstName": "Nathan",
        "middleName": "O.",
        "lastName": "Ortiz",
        "extName": "",
        "email": "nathan.ortiz@jdjs.edu",
        "program": "BS Sports Science",
        "year": "3rd Year",
        "role": "Secretary",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-SPT04",
        "firstName": "Grace",
        "middleName": "K.",
        "lastName": "Kelly",
        "extName": "",
        "email": "grace.kelly@jdjs.edu",
        "program": "BS Management",
        "year": "4th Year",
        "role": "Treasurer",
        "joinedAt": "2026-10-27"
      }
    ],
    "events": [
      {
        "id": "EVT-SPT01",
        "name": "SmashFest 2027: Campus Open Badminton Tournament",
        "category": "Sports & Recreation",
        "description": "Men's, women's, and mixed doubles badminton championship for students, faculty, and alumni.",
        "date": "2027-01-21",
        "startTime": "08:00",
        "endTime": "18:00",
        "venue": "University Sports Complex Courts",
        "targetParticipants": 160,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "Yonex Collegiate Series"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-11T09:00:00.000Z",
          "decidedAt": "2026-12-15T12:00:00.000Z"
        }
      },
      {
        "id": "EVT-SPT02",
        "name": "Racquet Agility & Footwork Masterclass",
        "category": "Sports & Recreation",
        "description": "Coaching clinic on high-speed court positioning, wrist control, smash angles, and conditioning drills.",
        "date": "2027-02-25",
        "startTime": "16:00",
        "endTime": "19:00",
        "venue": "Badminton Court 1 & 2",
        "targetParticipants": 60,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-17T14:00:00.000Z",
          "decidedAt": "2026-12-21T13:00:00.000Z"
        }
      }
    ],
    "branding": {
      "title": "Club Console",
      "sub": "Campus Badminton & Racquet Club"
    }
  },
  {
    "passwordHash": "332c8b906a8baad86cbe74903a09accb6bcb13adc6ffc54e7fd4582d7510f0dd",
    "account": {
      "status": "approved",
      "officialClubId": "CLB-ROB114",
      "approvedAt": "2026-11-01T08:00:00.000Z",
      "rejectionReason": null,
      "lastAppCode": null,
      "lastApprovalCode": null,
      "application": {
        "appId": "APP-ROB114",
        "clubName": "Robotics & AI Innovation Hub",
        "category": "Special Interest",
        "adviserFirstName": "Grace",
        "adviserMiddleName": "",
        "adviserLastName": "Hopper",
        "adviserExtName": "",
        "adviserEmail": "robotics.hub@jdjs.edu",
        "description": "Microcontroller design, machine learning algorithms, and intelligent automated systems.",
        "accreditationPhotos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "accreditationProof": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "submittedAt": "2026-10-25T08:00:00.000Z"
      }
    },
    "members": [
      {
        "id": "MEM-ROB01",
        "firstName": "Noah",
        "middleName": "E.",
        "lastName": "Ramos",
        "extName": "",
        "email": "noah.robotics@jdjs.edu",
        "program": "BS Computer Engineering",
        "year": "4th Year",
        "role": "President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-ROB02",
        "firstName": "Jordan",
        "middleName": "A.",
        "lastName": "Cruz",
        "extName": "",
        "email": "jordan.robotics@jdjs.edu",
        "program": "BS Electronics Engineering",
        "year": "3rd Year",
        "role": "Vice President",
        "joinedAt": "2026-10-25"
      },
      {
        "id": "MEM-ROB03",
        "firstName": "Kimberly",
        "middleName": "C.",
        "lastName": "Clark",
        "extName": "",
        "email": "kimberly.clark@jdjs.edu",
        "program": "BS Computer Science",
        "year": "2nd Year",
        "role": "Secretary",
        "joinedAt": "2026-10-26"
      },
      {
        "id": "MEM-ROB04",
        "firstName": "Sean",
        "middleName": "B.",
        "lastName": "Bailey",
        "extName": "",
        "email": "sean.bailey@jdjs.edu",
        "program": "BS Mechanical Engineering",
        "year": "3rd Year",
        "role": "Treasurer",
        "joinedAt": "2026-10-27"
      },
      {
        "id": "MEM-ROB05",
        "firstName": "David",
        "middleName": "L.",
        "lastName": "Lin",
        "extName": "",
        "email": "david.lin@jdjs.edu",
        "program": "BS Computer Engineering",
        "year": "1st Year",
        "role": "Member",
        "joinedAt": "2026-10-28"
      }
    ],
    "events": [
      {
        "id": "EVT-ROB01",
        "name": "Autonomous Drone Navigation & Computer Vision Workshop",
        "category": "Special Interest",
        "description": "Hands-on OpenCV and ROS2 tutorial building obstacle avoidance systems on quadcopters.",
        "date": "2027-01-26",
        "startTime": "09:00",
        "endTime": "17:00",
        "venue": "Robotics Innovation Center Rm 105",
        "targetParticipants": 90,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [],
        "externalPartners": [
          "DJI Education Desk"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-13T10:00:00.000Z",
          "decidedAt": "2026-12-17T11:00:00.000Z"
        }
      },
      {
        "id": "EVT-ROB02",
        "name": "Annual AI & Robotics Tech Exhibition 2027",
        "category": "Special Interest",
        "description": "Grand exhibition featuring intelligent robotics, robotic arms, deep learning showcases, and student hardware inventions.",
        "date": "2027-02-22",
        "startTime": "09:00",
        "endTime": "18:00",
        "venue": "Engineering Grand Hall",
        "targetParticipants": 220,
        "status": "auto",
        "photos": [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        ],
        "collaborators": [
          {
            "clubId": "CLB-CS101",
            "clubName": "Computer Science Society"
          }
        ],
        "externalPartners": [
          "NVIDIA Inception Community"
        ],
        "review": {
          "status": "approved",
          "note": "",
          "submittedAt": "2026-12-19T11:00:00.000Z",
          "decidedAt": "2026-12-23T15:00:00.000Z"
        }
      }
    ],
    "branding": {
      "title": "Club Console",
      "sub": "Robotics & AI Innovation Hub"
    }
  }
];
}
