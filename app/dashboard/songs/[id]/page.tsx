"use client";

import UpdateChordTab from "@/components/songs/UpdateChordTab";
import UpdateInfoTab from "@/components/songs/UpdateInfoTab";
import { Tab, Tabs } from "@heroui/react";
import { useEffect } from "react";
import useDetailUpdateSong from "./useDetailUpdateSong";

export default function DetailEditSong() {
  const {
    dataSong,
    handleUpdateSong,
    isPendingUpdateSong,
    isSuccessUpdateSong,
    refetchSongById,
  } = useDetailUpdateSong();

  useEffect(() => {
    if (isSuccessUpdateSong) {
      refetchSongById();
    }
  }, [isSuccessUpdateSong]);

  return (
    <Tabs
      className="w-full md:w-1/2 mt-4 max-w-lg"
      fullWidth
      aria-label="option-edit"
    >
      <Tab key="chord" title="Chord">
        <UpdateChordTab
          data={dataSong}
          onUpdate={handleUpdateSong}
          isPendingUpdate={isPendingUpdateSong}
          isSuccessUpdate={isSuccessUpdateSong}
        />
      </Tab>
      <Tab key="info" title="Info">
        <UpdateInfoTab
          onUpdate={handleUpdateSong}
          data={dataSong?.data}
          isPendingUpdate={isPendingUpdateSong}
          isSuccessUpdate={isSuccessUpdateSong}
        />
      </Tab>
    </Tabs>
  );
}
