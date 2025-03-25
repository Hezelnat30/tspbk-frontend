interface Song {
  _id: string;
  title: string;
  artist: string;
  youtubeUrl: string;
  chordImageUrl: FileList | string;
}

type ISong = Omit<Song, "_id">;

export type { Song, ISong };
