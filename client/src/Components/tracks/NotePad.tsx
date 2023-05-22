import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchTrack, setTrack, updateTrack } from "../../store/trackSlice";

type NotePadProps = {
  trackId: number,
  role: string
}

export default function NotePad({ trackId, role }: NotePadProps): JSX.Element {
  const [note, setNote] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch<AppDispatch>()
  const track = useSelector((state: RootState) => state.track);

  function handleBlur() {
    setIsFocused(false);
    updateNotes()
  }

  useEffect(() => {
    dispatch(fetchTrack({ getTrackByWhat: 'getTrackById', id: trackId }))
  }, [])
  useEffect(() => {
    if (track.track) {
      role === 'applicant'
        ? setNote(track.track.applicantNotes)
        : setNote(track.track.recruiterNotes)
    }
  }, [track.track])

  const updateNotes = useCallback(() => {
    if (role === 'applicant') {
      if (note.length) {
        dispatch(updateTrack({ trackId: trackId, track: { applicantNotes: note } }))
      } else {
        dispatch(updateTrack({ trackId: trackId, track: { applicantNotes: '' } }))
      }
    } else {
      if (note.length) {
        dispatch(updateTrack({ trackId: trackId, track: { recruiterNotes: note } }))
      } else {
        dispatch(updateTrack({ trackId: trackId, track: { recruiterNotes: '' } }))
      }
    }
  }, [note])

  return (
    <div className="flex space-x-2 h-12 max-h-12">
      <textarea
        id="notePad"
        name="notePad"
        rows={4}
        className="text-sm border border-gray-300 p-5 flex-1 bg-stone-100 rounded-lg shadow-md shadow-gray max-h-[32rem]"
        style={{ height: '400px' }}
        placeholder="Notes..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onBlur={handleBlur}
      ></textarea>
    </div>
  );
}
