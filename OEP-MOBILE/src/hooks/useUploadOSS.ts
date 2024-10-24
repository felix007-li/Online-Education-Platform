import { useQuery } from '@apollo/client';
import { GET_OSS_INFO } from '../graphql/oss';

export const useUploadOSS = () => {
  // 1 get signature
  // 2 fetch post: request to sent parameters to server
  const { data: d } = useQuery(GET_OSS_INFO);

  const uploadHandler = async (file: File) => {
    const formData = new FormData();
    const data = d.getOSSInfo;
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    const key = `images/${filename}`;
    formData.append('key', key);
    formData.append('policy', data.policy);
    formData.append('OSSAccessKeyId', data.accessId);
    formData.append('success_action_status', '200');
    formData.append('signature', data.signature);
    formData.append('file', file); // file to upload
    const res = await fetch(data.host, {
      method: 'POST',
      body: formData,
    });
    return { url: res.url + key };
  };

  return uploadHandler;
};
