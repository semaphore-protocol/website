---
sidebar_position: 2
title: Grupos
---

# Gupos Semaphore

Un [grupo Semaphore](/docs/glossary/#semaphore-group) contiene los [identity commitments](/docs/glossary/#identity-commitment) (compromisos de identidad) de miembros del grupo.
Estos son algunos ejemplos de uso de los grupos:

-   Encuesta con preguntas a la que se unen las personas que acudieron a un evento para calificarlo,
-   votación a la que se unen los miembros para votar por una propuesta,
-   Denunciantes que están verificados como empleados de una organización.

Un grupo Semaphore es un [árbol de Merkle incremental](/docs/glossary/#incremental-merkle-tree), y los miembros del grupo (por ejemplo, [identity commitments](/docs/glossary/#identity-commitments)) son las hojas del árbol.
Los grupos Semaphore determinan los siguientes dos parámetro:

-   **Group id**: un identificador único para el grupo;
-   **Tree depth**: el número máximo de miembros que puede contener un grupo (`max size = 2 ^ tree depth`).

Aprenda cómo trabajar con grupos.

-   [**Grupos off-chain**](#off-chain-groups)
-   [**Grupos on-chain**](#on-chain-groups)

## Grupos off-chain (externos a la cadena)

-   [Crear un grupo](#create-a-group)
-   [Añadir miembros](#add-members)
-   [Remover o actualizar miembros](#remove-or-update-members)

### Crear un grupo

Utilice la clase `Group` de la librería [`@semaphore-protocol/group`](https://github.com/semaphore-protocol/semaphore/blob/main/packages/group) para crear un grupo off-chain con los siguientes parámetros:

-   `Group id`: un identificar único para el grupo;
-   `Tree depth`: (_default `20`_) el número máximo de usuarios que puede contener un grupo, el valor por defecto es 20 (`max size = 2 ^ tree depth`).

Para crear un grupo con el número de usuarios que aparece por defecto (20) _`treeDepth`_, llame la función para construir un `Group` sin el segundo parámetro. Por ejemplo:

```ts
import { Group } from "@semaphore-protocol/group"

const group = new Group(1)
```

El siguiente código de ejemplo pasa por _`treeDepth`_ para crear un grupo para `2 ^ 30 = 1073741824` miembros:

```ts
import { Group } from "@semaphore-protocol/group"

const group = new Group(1, 30)
```

### Añadir miembros

Utiliza la función `Group addMember` para añadir un miembro (es decir su "identity commitment") a un grupo. Por ejemplo:

```ts
group.addMember(identityCommitment)
```

Para añadir un lote de miembros a un grupo, pasa una selección por la función `Group addMembers`. Por ejemplo:

```ts
group.addMembers([identityCommitment1, identityCommitment2])
```

### Remover o actualizar miembros

Para remover miembros de un equipo, pasa el índice del miembro por la función `Group removeMember`. Por ejemplo:

```ts
group.removeMember(0)
```

Para actualizar los miembros dentro de un grupo, pasa el índice del miembro y el nuevo valor por la función `Group updateMember`. Por ejemplo:

```ts
group.updateMember(0, 2)
```

:::cuidado
Remover a un miembro de un grupo configura el valor del nodo a un valor especial (ejemplo, `zeroValue`).
Dado que ese nodo no se remueve y el largo de la selección de `group.members` no cambia.
:::

## Grupos on-chain

El contrato [`SemaphoreGroups`](https://github.com/semaphore-protocol/semaphore/tree/main/packages/contracts/base/SemaphoreGroups.sol) utiliza la librería del [`IncrementalBinaryTree`](https://github.com/privacy-scaling-explorations/zk-kit/blob/main/packages/incremental-merkle-tree.sol/contracts/IncrementalBinaryTree.sol) (árbol binario incremental) y provee métodos para crear y administrar grupos.

:::información
puede importar el contrato `SemaphoreGroups.sol` y otros contratos Semaphore del módulo NPM [`@semaphore-protocol/contracts`](https://github.com/semaphore-protocol/semaphore/tree/main/packages/contracts).
:::

Alternativamente, puede utilizar un contrato [`Semaphore.sol`](https://github.com/semaphore-protocol/semaphore/blob/main/packages/contracts/Semaphore.sol) ya desplegado y utilizar sus funciones externas para grupos.
