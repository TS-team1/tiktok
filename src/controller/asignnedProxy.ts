import Proxy from "../models/Proxy";
import Account from "../models/Account";

export const assignProxyToAccount = async (accountId: string) => {
  const availableProxy = await Proxy.findOne({ assignedTo: null });

  if (!availableProxy) {
    console.log("No available proxies!");
    return null;
  }

  await Proxy.findByIdAndUpdate(availableProxy._id, { assignedTo: accountId });
  await Account.findByIdAndUpdate(accountId, { proxy: availableProxy._id });

  return availableProxy;
};
