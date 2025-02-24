export const getRandomCode = () => {
  const code = [];
  for (let i = 0; i < 4; i++) {
    code.push(Math.floor(Math.random() * 9));
  }
  return code.join("");
};

export const getEnvConfig = () =>
  `${process.env.NODE_ENV}` === "development"
    ? ".env"
    : "/etc/server.conf/.env";
