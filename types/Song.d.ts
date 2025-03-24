interface Song {
  _id: string;
  title: string;
  artist: string;
  youtubeUrl: string;
  chordImageUrl: string;
}

type ISong = Omit<Song, "_id">;

export type { Song, ISong };
