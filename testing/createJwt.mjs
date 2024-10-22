import { SignJWT } from "jose";

const secret = await getLine();

const payload = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["pacs_ro"],
    "x-hasura-default-role": "pacs_ro",
  },
};

const jwt = await new SignJWT(payload)
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .sign(secret);

console.log(jwt);

async function getLine() {
  const data = await Bun.stdin.bytes();
  return data.filter((byte) => byte !== "\n".charCodeAt(0));
}
