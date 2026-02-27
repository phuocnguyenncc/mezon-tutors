---
name: 'data-migration'
root: 'prisma/data-migrations'
output: '**/*'
ignore: []
questions:
  title: 'Please enter a title.'
---

# `{{ date "YYYYMMDDHHmmss" }}_{{ inputs.title | snake }}.ts`

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // TODO: Write your migration code here.
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```
