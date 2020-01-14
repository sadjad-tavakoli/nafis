export const isPermit = (section, job) => {
  switch (section) {
    case "sale":
      return job === "admin" || job === "salesperson" || job === "storekeeper";

    case "cashregister":
      return job === "admin" || job === "cashier" || job === "accountant";

    case "depository":
      return job === "admin" || job === "storekeeper" || job === "accountant";

    case "customers":
      return job === "admin" || job === "storekeeper" || job === "accountant";

    default:
      return false;
  }
};
