import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FaFileDownload } from 'react-icons/fa';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const parseFileNameFromDisposition = (contentDisposition) => {
  if (!contentDisposition || typeof contentDisposition !== 'string') {
    return null;
  }

  const utf8NameMatch = contentDisposition.match(/filename\*=UTF-8''([^;\n]+)/i);
  if (utf8NameMatch?.[1]) {
    return decodeURIComponent(utf8NameMatch[1]).replace(/['"]/g, '').trim();
  }

  const plainNameMatch = contentDisposition.match(/filename=([^;\n]+)/i);
  if (plainNameMatch?.[1]) {
    return plainNameMatch[1].replace(/['"]/g, '').trim();
  }

  return null;
};

function Download({ result, topic }) {
  const [downloading, setDownloading] = useState(false);

  const canDownload = useMemo(() => {
    return Boolean(result && typeof result === 'object' && !downloading);
  }, [result, downloading]);

  const handleDownload = async () => {
    if (!result || typeof result !== 'object') {
      toast.error('Please generate notes first.');
      return;
    }

    try {
      setDownloading(true);

      const response = await axiosInstance.post(
        API_PATHS.DOWNLOAD,
        { result, topic },
        { responseType: 'blob' }
      );

      const contentDisposition = response.headers?.['content-disposition'];
      const fileName = parseFileNameFromDisposition(contentDisposition) || 'study_notes.pdf';

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Download started.');
    } catch (error) {
      const message = error?.response?.data?.error || 'Failed to download PDF.';
      toast.error(message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={!canDownload}
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-2xl border border-b border-white/50 bg-violet-500 px-4 py-2 text-sm text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
        <FaFileDownload />
        <span>{downloading ? 'Preparing PDF...' : 'Download PDF'}</span>
    </button>
  );
}

export default Download;