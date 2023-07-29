const truncateMiddle = (fullStr, strLen, separator, backLen) => {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || '...';

  const sepLen = separator.length;
  const charsToShow = strLen - sepLen;
  const frontChars = charsToShow - backLen;
  const backChars = backLen;

  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
};

export default truncateMiddle;
