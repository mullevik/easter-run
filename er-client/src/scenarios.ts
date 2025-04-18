import { Track } from './track'

export const POINT_A = { lat: 50.061495, lon: 14.425202 } // Prague: near Vysehrad
export const POINT_B = { lat: 50.058621, lon: 14.431561 } // Prague: near Prazskeho Povstani

export const SMALL_TRACK = new Track(
  [
    { position: POINT_A, timeToReachNext: 60 },
    { position: POINT_B, timeToReachNext: 60 },
  ],
  new Date(1739612690546),
)

export const THE_TRACK = new Track(
  [
    { position: { lat: 50.050351, lon: 14.420486 }, timeToReachNext: 5 },
    { position: { lat: 50.050164, lon: 14.420603 }, timeToReachNext: 4 },
    { position: { lat: 50.049995, lon: 14.420733 }, timeToReachNext: 5 },
    { position: { lat: 50.049821, lon: 14.420828 }, timeToReachNext: 8 },
    { position: { lat: 50.049637, lon: 14.420882 }, timeToReachNext: 7 },
    { position: { lat: 50.049492, lon: 14.421067 }, timeToReachNext: 9 },
    { position: { lat: 50.04928, lon: 14.421166 }, timeToReachNext: 2 },
    { position: { lat: 50.049133, lon: 14.421351 }, timeToReachNext: 7 },
    { position: { lat: 50.048953, lon: 14.421445 }, timeToReachNext: 7 },
    { position: { lat: 50.048816, lon: 14.421642 }, timeToReachNext: 8 },
    { position: { lat: 50.048648, lon: 14.421814 }, timeToReachNext: 7 },
    { position: { lat: 50.048534, lon: 14.422049 }, timeToReachNext: 5 },
    { position: { lat: 50.048456, lon: 14.422337 }, timeToReachNext: 6 },
    { position: { lat: 50.048469, lon: 14.422621 }, timeToReachNext: 5 },
    { position: { lat: 50.04856, lon: 14.422878 }, timeToReachNext: 5 },
    { position: { lat: 50.04864, lon: 14.423134 }, timeToReachNext: 3 },
    { position: { lat: 50.048788, lon: 14.423382 }, timeToReachNext: 6 },
    { position: { lat: 50.04885, lon: 14.42365 }, timeToReachNext: 7 },
    { position: { lat: 50.048912, lon: 14.423953 }, timeToReachNext: 5 },
    { position: { lat: 50.048961, lon: 14.424232 }, timeToReachNext: 6 },
    { position: { lat: 50.048989, lon: 14.424531 }, timeToReachNext: 7 },
    { position: { lat: 50.049018, lon: 14.424809 }, timeToReachNext: 7 },
    { position: { lat: 50.049061, lon: 14.425109 }, timeToReachNext: 6 },
    { position: { lat: 50.049078, lon: 14.425399 }, timeToReachNext: 6 },
    { position: { lat: 50.049074, lon: 14.42568 }, timeToReachNext: 7 },
    { position: { lat: 50.049073, lon: 14.425978 }, timeToReachNext: 6 },
    { position: { lat: 50.049112, lon: 14.42628 }, timeToReachNext: 6 },
    { position: { lat: 50.049151, lon: 14.426563 }, timeToReachNext: 6 },
    { position: { lat: 50.049176, lon: 14.426873 }, timeToReachNext: 6 },
    { position: { lat: 50.049197, lon: 14.427168 }, timeToReachNext: 6 },
    { position: { lat: 50.049212, lon: 14.427448 }, timeToReachNext: 5 },
    { position: { lat: 50.049258, lon: 14.427757 }, timeToReachNext: 5 },
    { position: { lat: 50.049279, lon: 14.428066 }, timeToReachNext: 6 },
    { position: { lat: 50.049287, lon: 14.428349 }, timeToReachNext: 6 },
    { position: { lat: 50.049192, lon: 14.428587 }, timeToReachNext: 7 },
    { position: { lat: 50.049006, lon: 14.428683 }, timeToReachNext: 6 },
    { position: { lat: 50.048811, lon: 14.428713 }, timeToReachNext: 7 },
    { position: { lat: 50.048627, lon: 14.428722 }, timeToReachNext: 5 },
    { position: { lat: 50.048435, lon: 14.428713 }, timeToReachNext: 6 },
    { position: { lat: 50.04823, lon: 14.428671 }, timeToReachNext: 7 },
    { position: { lat: 50.048037, lon: 14.428631 }, timeToReachNext: 6 },
    { position: { lat: 50.047858, lon: 14.428561 }, timeToReachNext: 6 },
    { position: { lat: 50.047675, lon: 14.428494 }, timeToReachNext: 4 },
    { position: { lat: 50.047498, lon: 14.428394 }, timeToReachNext: 6 },
    { position: { lat: 50.04744, lon: 14.428125 }, timeToReachNext: 7 },
    { position: { lat: 50.047549, lon: 14.427862 }, timeToReachNext: 6 },
    { position: { lat: 50.047686, lon: 14.427608 }, timeToReachNext: 5 },
    { position: { lat: 50.047795, lon: 14.427368 }, timeToReachNext: 5 },
    { position: { lat: 50.047905, lon: 14.42714 }, timeToReachNext: 6 },
    { position: { lat: 50.04801, lon: 14.426904 }, timeToReachNext: 6 },
    { position: { lat: 50.048106, lon: 14.426642 }, timeToReachNext: 6 },
    { position: { lat: 50.04816, lon: 14.426375 }, timeToReachNext: 5 },
    { position: { lat: 50.048178, lon: 14.426083 }, timeToReachNext: 6 },
    { position: { lat: 50.048163, lon: 14.425804 }, timeToReachNext: 6 },
    { position: { lat: 50.048135, lon: 14.425518 }, timeToReachNext: 5 },
    { position: { lat: 50.048076, lon: 14.425211 }, timeToReachNext: 5 },
    { position: { lat: 50.047997, lon: 14.424939 }, timeToReachNext: 6 },
    { position: { lat: 50.047891, lon: 14.424685 }, timeToReachNext: 6 },
    { position: { lat: 50.047799, lon: 14.424425 }, timeToReachNext: 7 },
    { position: { lat: 50.047669, lon: 14.424225 }, timeToReachNext: 6 },
    { position: { lat: 50.047539, lon: 14.423997 }, timeToReachNext: 5 },
    { position: { lat: 50.047376, lon: 14.423814 }, timeToReachNext: 6 },
    { position: { lat: 50.047226, lon: 14.423614 }, timeToReachNext: 6 },
    { position: { lat: 50.047064, lon: 14.423448 }, timeToReachNext: 6 },
    { position: { lat: 50.04693, lon: 14.423252 }, timeToReachNext: 5 },
    { position: { lat: 50.046784, lon: 14.423069 }, timeToReachNext: 6 },
    { position: { lat: 50.046643, lon: 14.422891 }, timeToReachNext: 7 },
    { position: { lat: 50.046576, lon: 14.422603 }, timeToReachNext: 6 },
    { position: { lat: 50.046551, lon: 14.422289 }, timeToReachNext: 8 },
    { position: { lat: 50.04652, lon: 14.421994 }, timeToReachNext: 6 },
    { position: { lat: 50.046462, lon: 14.421723 }, timeToReachNext: 5 },
    { position: { lat: 50.046446, lon: 14.421443 }, timeToReachNext: 7 },
    { position: { lat: 50.04647, lon: 14.421141 }, timeToReachNext: 6 },
    { position: { lat: 50.046486, lon: 14.420857 }, timeToReachNext: 6 },
    { position: { lat: 50.046503, lon: 14.420563 }, timeToReachNext: 6 },
    { position: { lat: 50.046541, lon: 14.420288 }, timeToReachNext: 7 },
    { position: { lat: 50.046584, lon: 14.419987 }, timeToReachNext: 7 },
    { position: { lat: 50.046611, lon: 14.419698 }, timeToReachNext: 6 },
    { position: { lat: 50.046667, lon: 14.419412 }, timeToReachNext: 6 },
    { position: { lat: 50.046717, lon: 14.419135 }, timeToReachNext: 6 },
    { position: { lat: 50.046779, lon: 14.418868 }, timeToReachNext: 6 },
    { position: { lat: 50.046871, lon: 14.418614 }, timeToReachNext: 7 },
    { position: { lat: 50.04702, lon: 14.41842 }, timeToReachNext: 7 },
    { position: { lat: 50.047196, lon: 14.418323 }, timeToReachNext: 8 },
    { position: { lat: 50.047386, lon: 14.418283 }, timeToReachNext: 7 },
    { position: { lat: 50.047537, lon: 14.418126 }, timeToReachNext: 7 },
    { position: { lat: 50.047671, lon: 14.417898 }, timeToReachNext: 8 },
    { position: { lat: 50.047828, lon: 14.417721 }, timeToReachNext: 8 },
    { position: { lat: 50.048011, lon: 14.417759 }, timeToReachNext: 7 },
    { position: { lat: 50.04821, lon: 14.417797 }, timeToReachNext: 7 },
    { position: { lat: 50.048409, lon: 14.417811 }, timeToReachNext: 5 },
    { position: { lat: 50.048595, lon: 14.417797 }, timeToReachNext: 5 },
    { position: { lat: 50.04878, lon: 14.41781 }, timeToReachNext: 5 },
    { position: { lat: 50.048963, lon: 14.417836 }, timeToReachNext: 6 },
    { position: { lat: 50.049147, lon: 14.417835 }, timeToReachNext: 9 },
    { position: { lat: 50.049337, lon: 14.417799 }, timeToReachNext: 6 },
    { position: { lat: 50.049494, lon: 14.418 }, timeToReachNext: 7 },
    { position: { lat: 50.049631, lon: 14.418205 }, timeToReachNext: 8 },
    { position: { lat: 50.04972, lon: 14.418459 }, timeToReachNext: 7 },
    { position: { lat: 50.049789, lon: 14.418739 }, timeToReachNext: 6 },
    { position: { lat: 50.049865, lon: 14.419018 }, timeToReachNext: 7 },
    { position: { lat: 50.049952, lon: 14.419271 }, timeToReachNext: 3 },
    { position: { lat: 50.05011, lon: 14.419577 }, timeToReachNext: 4 },
    { position: { lat: 50.050224, lon: 14.419798 }, timeToReachNext: 6 },
    { position: { lat: 50.05033, lon: 14.420025 }, timeToReachNext: 5 },
  ],
  new Date(1739612690546),
)
