---
sidebar_position: 1
title: Identidades
---

# Identidades Semaphore 

Para unirse a un [grupo Semaphore](/docs/glossary#semaphore-group), un usuario primero deberá crear una [identidad Semaphore](/docs/glossary#semaphore-identity).
Una identidad Semaphore contiene dos valores generados junto con la identidad:

-   Identidad trampilla
-   Identidad anulador

Para utilizar y verificar su identidad, la persona dueña de la identidad (usuario) debe conocer los valores trampilla y anulador.
Para prevenir fraudes, la persona dueña debe conservar de forma secreta ambos valores.

## Crear identidades

En su código, utilice la librería [`@semaphore-protocol/identity`](https://github.com/semaphore-protocol/semaphore/tree/main/packages/identity) para crear una identidad Semaphore _de forma determinística_ (del hash de un mensaje) o _de forma aleatoria_.

-   [**Crear identidades aleatorias**](#create-random-identities)
-   [**Crear identidades determinísticas**](#create-deterministic-identities)

### Crear identidades aleatorias

Para crear una identidad aleatoria, represente `Identity` sin algún parámetro--por ejemplo:

```ts
import { Identity } from "@semaphore-protocol/identity"

const { trapdoor, nullifier, commitment } = new Identity()
```

La nueva identidad contiene dos valores secretos aleatorios: `trapdoor` y `nullifier`, y un valor público: `commitment`.

El hash Poseidon de la identidad anulador y trampilla se conoce como la _identidad secreta_,
y su hash es el _compromiso de identidad_.

Un compromiso de identidad, de forma similar a las direcciones Ethereum, es un valor público que se utiliza en los grupos Semaphore para representar la 
identidad de un miembro del grupo. Los valores secretos son similares a las llaves privadas 
Ethereum y se utilizan para generar pruebas de conocimiento cero (ZKP) Semaphore y autenticar señales.

### Crear identidades determinísticas

Si transmite un mensaje como un parámetro, Semaphore genera `trapdoor` y `nullifier`
del hash _SHA256_ del mensaje.
El mensaje puede ser una constraseña o un mensaje que el usuario firma de forma criptográfica con una llave privada.

Al utilizar identidades determinísticas siempre deberá mantener secreto el mensaje. 
Dado que el hash es determinístico, cualquier persona con el mismo mensaje puede recrear la misma identidad.

```ts
const identity = new Identity("secret-message")
```

:::recomendación
Crear un sistema que guarde o recupere valores secretos de identidades Semaphore es no trivial.
Puede elegir delegar este tipo de funcionalidad a carteras existente como Metamask--por ejemplo:

1. En Metamask, un usuario firma un mensaje con la llave privada de su cuenta Ethereum.
2. En la aplicación que usted ofrece, el usuario crea una identidad determinística con el mensaje firmado.
3. Ahora el usuario puede recrear su identidad Semaphore cuando quiera al firmar el mismo mensaje con su cuenta Ethereum en Metamask.

:::

## Guarde sus identidades

Puede generar una identidad como una cadena de caractéres (string) JSON que puede guardar y reutilizar más tarde. 
El método `Identity.toString()` genera una matriz JSON a partir de una identidad--por ejemplo:

```ts
console.log(identity.toString()) // Ver la identidad trampilla y anulador.

// '["8255d...", "62c41..."]'
```

La matriz contiene la trampilla y el anulador.

Para reutilizar la identidad guardada, transforme la cadena JSON al constructor `Identity()`.

```ts
const identity2 = new Identity(identity.toString())
```
