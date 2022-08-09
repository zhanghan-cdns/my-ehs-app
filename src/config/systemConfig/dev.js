export const getDevEnvironmentConfig = () => {
  const baseUrl = "http://192.168.1.106";
  const basePort = "18000";
  const agentPort = "1438";
  return {
    BASE_URL: `${baseUrl}:${basePort}`, // 请求路径
    IMG_URL: `http://localhost:${agentPort}/api/resource/file/download?url=`, // 图片路径
    APP_COMPREPORT: `${baseUrl}:8867`,
    APP_CONFIG: `${baseUrl}:${agentPort}/api`,
  };
};
