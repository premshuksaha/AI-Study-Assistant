import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Homelayout from '../components/Home/homelayout'
import { useUserAuth } from '../hooks/useUserAuth';
import Noteshistory from '../components/History/Noteshistory';
import Notes from '../components/History/Notes';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import { useNavigate, useParams } from 'react-router-dom';


const History = () => {
  const { isLoading } = useUserAuth();
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [notesList, setNotesList] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteLoading, setNoteLoading] = useState(false);

  const loadNotesList = async () => {
    try {
      setListLoading(true);
      const response = await axiosInstance.get(API_PATHS.NOTES.GET_ALL);
      const data = Array.isArray(response?.data) ? response.data : [];
      setNotesList(data);
    } catch {
      toast.error('Failed to load note history.');
      setNotesList([]);
    } finally {
      setListLoading(false);
    }
  };

  const loadSingleNote = async (noteId) => {
    if (!noteId) return;

    try {
      setNoteLoading(true);
      const response = await axiosInstance.get(API_PATHS.NOTES.GET_SINGLE(noteId));
      setSelectedNote(response?.data || null);
    } catch {
      toast.error('Failed to load this note.');
      setSelectedNote(null);
    } finally {
      setNoteLoading(false);
    }
  };

  useEffect(() => {
    loadNotesList();
  }, []);

  useEffect(() => {
    if (!noteId) {
      setSelectedNote(null);
      return;
    }

    loadSingleNote(noteId);
  }, [noteId]);

  const openNote = (id) => {
    if (!id) return;
    navigate(`/history/${id}`);
  };

  const goBackToList = () => {
    navigate('/history');
  };

  return (
    <Homelayout activeMenu="History" isLoading={isLoading}>
      {!noteId ? (
        <Noteshistory
          notes={notesList}
          loading={listLoading}
          onSelect={openNote}
        />
      ) : (
        <Notes note={selectedNote} loading={noteLoading} onBack={goBackToList} />
      )}
    </Homelayout>
  )
}

export default History