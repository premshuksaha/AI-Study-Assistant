import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import Loader from '../Loader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';

const initialFormData = {
  topic: '',
  classLevel: '',
  examType: '',
  revisionMode: false,
  includeDiagram: false,
  includeChart: false,
};

const ToggleSwitch = ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between rounded-xl px-3 py-3">
      <span className="text-xs font-medium text-zinc-200">{label}</span>

      <label htmlFor={id} className="relative inline-flex cursor-pointer items-center">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={onChange}
        />
        <span className="h-5 w-10 rounded-full border-2 border-white/20 bg-zinc-300/20 transition-colors peer-checked:border-green-400 peer-checked:bg-green-500/15" />
        <span className="absolute left-1 h-3 w-3 rounded-full bg-zinc-200 shadow-sm transition-all peer-checked:left-6 peer-checked:bg-green-500" />
      </label>
    </div>
  );
};

function TopicForm({ onResult }) {
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const { user, updateUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name) => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleGenerate = async () => {
    const response = await axiosInstance.post(API_PATHS.GENERATE_NOTES, formData);
    
    // Update user credits in context
    if (response?.data?.creditsLeft !== undefined && user) {
      updateUser({
        ...user,
        credits: response.data.creditsLeft,
      });
    }
    onResult?.(response?.data?.data ?? null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const { topic, classLevel, examType } = formData;

    if (!topic.trim() || !classLevel.trim() || !examType.trim()) {
      toast.error('Please fill topic, class level, and exam type.');
      return;
    }

    try {
      setSubmitting(true);
      await handleGenerate();
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to generate notes. Please try again.';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-zinc-100">Generate Study Notes</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Fill in your topic details and choose what to include.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="topic" className="mb-2 block text-sm font-medium text-zinc-200">
              Topic
            </label>
            <input
              id="topic"
              name="topic"
              type="text"
              value={formData.topic}
              onChange={handleInputChange}
              placeholder="e.g. Photosynthesis"
              className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2.5 text-sm text-zinc-100 outline-none transition focus:border-violet-400"
            />
          </div>

          <div>
            <label htmlFor="classLevel" className="mb-2 block text-sm font-medium text-zinc-200">
              Class Level
            </label>
            <input
              id="classLevel"
              name="classLevel"
              type="text"
              value={formData.classLevel}
              onChange={handleInputChange}
              placeholder="e.g. Class 10"
              className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2.5 text-sm text-zinc-100 outline-none transition focus:border-violet-400"
            />
          </div>

          <div>
            <label htmlFor="examType" className="mb-2 block text-sm font-medium text-zinc-200">
              Exam Type
            </label>
            <input
              id="examType"
              name="examType"
              type="text"
              value={formData.examType}
              onChange={handleInputChange}
              placeholder="e.g. Board Exam"
              className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2.5 text-sm text-zinc-100 outline-none transition focus:border-violet-400"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <ToggleSwitch
            id="revisionMode"
            label="Exam Revision Mode"
            checked={formData.revisionMode}
            onChange={() => handleToggleChange('revisionMode')}
          />

          <ToggleSwitch
            id="includeDiagram"
            label="Include Diagram"
            checked={formData.includeDiagram}
            onChange={() => handleToggleChange('includeDiagram')}
          />

          <ToggleSwitch
            id="includeChart"
            label="Include Chart"
            checked={formData.includeChart}
            onChange={() => handleToggleChange('includeChart')}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-violet-500 px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <Loader size="sm" text="Generating..." className="justify-center text-white px-8" />
            ) : (
              'Generate Notes (10 Credits)'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TopicForm;