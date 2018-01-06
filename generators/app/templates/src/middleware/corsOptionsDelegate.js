import Config from "config";

const corsWhitelist = Config.get('cors.whitelist');

export default (req, callback) => {
  let origin = !corsWhitelist;
  if (corsWhitelist) {
    const corsArray = String(corsWhitelist).split(',');
    origin = Boolean(
      corsArray.indexOf(req.header('Origin')) !== -1 || corsArray.indexOf('*') !== -1
    );
  }

  const corsOptions = { origin };
  callback(null, corsOptions);
};