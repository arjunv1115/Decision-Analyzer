const USERS_KEY = "dha_users";
const CURRENT_USER_KEY = "dha_current_user";
const DECISIONS_KEY = "dha_decisions";

export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  } catch {
    return null;
  }
};

export const saveCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const removeCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getAllDecisions = () => {
  try {
    return JSON.parse(localStorage.getItem(DECISIONS_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveAllDecisions = (decisions) => {
  localStorage.setItem(DECISIONS_KEY, JSON.stringify(decisions));
};

export const getUserDecisions = (userId) => {
  return getAllDecisions().filter((decision) => decision.userId === userId);
};

export const saveDecision = (decision) => {
  const decisions = getAllDecisions();
  decisions.push(decision);
  saveAllDecisions(decisions);
};

export const updateDecision = (updatedDecision) => {
  const decisions = getAllDecisions();
  const updated = decisions.map((decision) =>
    decision.id === updatedDecision.id
      ? updatedDecision
      : decision
  );
  saveAllDecisions(updated);
};

export const deleteDecision = (decisionId) => {
  const decisions = getAllDecisions();
  const filtered = decisions.filter(
    (decision) => decision.id !== decisionId
  );
  saveAllDecisions(filtered);
};