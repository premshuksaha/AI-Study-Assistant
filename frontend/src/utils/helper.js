export function canSubmitLogin({ email, password }) {
  const trimmedEmail = (email ?? "").trim();
  if (!trimmedEmail) return false;
  if (!password) return false;
  return true;
}

export function canSubmitSignup({ username, email, password }) {
  const trimmedUsername = (username ?? "").trim();
  const trimmedEmail = (email ?? "").trim();
  if (!trimmedUsername) return false;
  if (!trimmedEmail) return false;
  if (!password) return false;
  return true;
}

