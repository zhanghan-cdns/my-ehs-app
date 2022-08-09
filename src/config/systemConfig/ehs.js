// export const getEhsEnvironmentConfig = () => {
//   const baseUrl = 'http://192.168.1.112'
//   const basePort = '18000'
//   const agentPort = '18000'
//   return {
//     BASE_URL: `${baseUrl}:${basePort}`,//请求路径
//     IMG_URL: `${baseUrl}:${agentPort}/resource/file/download?url=`,//图片路径
//     APP_COMPREPORT: `${baseUrl}:8867`,
//     APP_CONFIG: `${baseUrl}:${agentPort}/api`,
//   }
// }

export const getEhsEnvironmentConfig = () => {
  const baseUrl = "http://121.229.45.240";
  const basePort = "1888";
  const agentPort = "1888";
  return {
    BASE_URL: `${baseUrl}:${basePort}`, // 请求路径
    IMG_URL: `${baseUrl}:${agentPort}/resource/file/download?url=`, // 图片路径
    APP_COMPREPORT: `${baseUrl}:8867`,
    APP_CONFIG: `${baseUrl}:${agentPort}/api`,
  };
};
