// Shared anti-spam rules for all enquiry forms.
(function () {
  // Returns the number in +61 format, or null if it isn't an Australian number.
  // Accepts +61 / 0061 / 61 prefixes and local 0X numbers (e.g. 0412 345 678).
  function normaliseAuPhone(raw) {
    var s = String(raw || '').replace(/[\s\-().]/g, '');
    var national;
    if (/^\+61/.test(s)) national = s.slice(3);
    else if (/^0061/.test(s)) national = s.slice(4);
    else if (/^61\d{9}$/.test(s)) national = s.slice(2);
    else if (/^0\d{9}$/.test(s)) national = s.slice(1);
    else return null;
    if (national.charAt(0) === '0') national = national.slice(1); // +61 (0)4...
    if (!/^[23478]\d{8}$/.test(national)) return null;
    return '+61' + national;
  }

  var BLOCKED = /\bs\.?e\.?o\b|marketing/i;

  function containsBlockedTerms() {
    for (var i = 0; i < arguments.length; i++) {
      if (BLOCKED.test(String(arguments[i] || ''))) return true;
    }
    return false;
  }

  window.SpamGuard = {
    normaliseAuPhone: normaliseAuPhone,
    isAuPhone: function (raw) { return normaliseAuPhone(raw) !== null; },
    containsBlockedTerms: containsBlockedTerms
  };
}());
