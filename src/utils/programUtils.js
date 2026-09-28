export function groupProgramByDate(programData) {
  if (!Array.isArray(programData)) {
    return {};
  }

  return programData.reduce((groups, item) => {
    if (!groups[item.date]) {
      groups[item.date] = [];
    }

    groups[item.date].push(item);
    return groups;
  }, {});
}