/**
 * В TypeScript typeof можно использовать для определения типа основываясь на уже существующем типе переменной.
 * typeof позволяет получить тип уже существующей переменной или объекта и использовать его для типизации других переменных.
 */

interface Role {
  role: string;
}

interface User {
  name: string;
  roles: Role[];
}

/* С помощью второго обращения [number] достает тип Role */
type RoleType = User["roles"][number];

/* as const делает readonly */
const roles = ["admin", "user", "super-user"] as const;

/* Делает литер */
type RoleType2 = (typeof roles)[number];

const statuses = { open: 1, closed: 2, error: 3 } as const;

type keys = keyof typeof statuses;
