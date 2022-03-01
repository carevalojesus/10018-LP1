# Un primer acercamiento a JavaScript
> Ahora que has aprendido algo sobre la teoría de JavaScript y lo que puedes hacer con ella, te daremos un curso intensivo sobre las características básicas de JavaScript a través de un tutorial completamente práctico. Aquí crearás un sencillo juego de "Adivina el número", paso a paso.

| Prerrequisito                                                                                                | Objetivos                                                                                                                                                   |
| :----------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Conocimientos básicos de informática, comprensión básica de HTML y CSS, comprensión de lo que es JavaScript. | Tener un poco de experiencia escribiendo algo de JavaScript, y conseguir al menos una comprensión básica de lo que implica escribir un programa JavaScript. |

No esperes entender todo el código inmediatamente — por ahora sólo queremos presentarte los conceptos de alto nivel, y darte una idea de como funciona JavaScript (y otros lenguajes de programación). ¡Más adelante vas a volver a ver estas características con mucho más detalle!

> **Nota**: Muchas de las características que vas a ver en JavaScript son las mismas que en otros lenguajes de programación — funciones, bucles, etc. La sintaxis del código es diferente, pero los conceptos siguen siendo básicamente los mismos. La sintaxis del código es diferente, pero los conceptos siguen siendo básicamente los mismos.

## Pensando como programador
Una de las cosas más difíciles de aprender en programación no es la sintaxis que necesita aprender, sino cómo aplicarla para resolver problemas del mundo real. Debes comenzar a pensar como un programador — esto generalmente implica mirar descripciones de lo que necesita hacer tu programa, determinar qué características de código necesitas para alcanzar esas cosas y cómo hacer que funcionen juntas.

Esto implica una combinación de trabajo duro, experiencia con la sintaxis de programación y práctica — más un poquito de creatividad. Mientras más programes, más habilidoso serás haciéndolo. No te podemos prometer que vas a desarrollar un "cerebro de programador" en cinco minutos, pero, a lo largo de este curso, te vamos a dar muchas oportunidades de practicar el pensar como un programador.

Teniendo esto en mente, veamos el ejemplo que vamos a construir en este artículo, y revisemos el proceso general de seccionarlo y dividirlo en tareas tangibles.

## Ejemplo — Juego adivina el número

Imaginemos que tu jefe te ha dado el siguiente resumen para crear este juego:

> Quiero que crees un sencillo juego del tipo "adivina el número". Se debe elegir un número aleatorio entre 1 y 100, luego desafiar al jugador a adivinar el número en 10 intentos. Después de cada intento, debería decirle al jugador si ha acertado o no — y si está equivocado, debería decirle si se ha quedado corto o se ha pasado. También debería decir los números que ya se probaron anteriormente. El juego terminará una vez que el jugador acierte o cuando se acaben los intentos. Cuando el juego termina, se le debe dar al jugador la opción de volver a jugar.

Al observar este resumen, lo primero que podemos hacer es comenzar a desglosar el proyecto en tareas simples y realizables, con la mayor mentalidad de programador posible:

1. Generar un número aleatorio entre 1 y 100.
2. Registrar el número del intento en el que el jugador se encuentre. Empezando en 1.
3. Darle al jugador una forma de adivinar cuál es el número.
4. Una vez que se ha introducido en número, registrarlo en alguna parte para que el jugador pueda ver sus intentos previos.
5. A continuación, comprobar si el número es correcto.
6. Si es correcto:
	- Mostrar un mensaje de felicitaciones.
	- Hacer que el jugador no pueda introducir más intentos (esto arruinaría el juego).
	- Mostrar un control que permita al jugador volver a empezar el juego.
7. Si es incorrecto y al jugador todavía le quedan intentos:
	- Decirle al jugador que ha fallado.
	- Dejar que el jugador lo intente de nuevo.
	- Incrementa el número de intentos en 1.
8. Si el jugador falla y no le quedan turnos:
	- Decirle al jugador que el juego se ha terminado.
	- Hacer que el jugador no pueda introducir más intentos (esto arruinaría el juego).
	- Mostrar un control que permita al jugador volver a empezar el juego.
9. Una vez que el juego se reinicia, asegúrate de que la lógica del juego y la IU (interfaz de usuario) se restablezcan por completo, luego vuelve al paso 1.

Veamos cómo podemos trasformar estos pasos en código, construyendo el ejemplo y explorando las características de JavaScript a medida que avanzamos.

### Configuración inicial

Para empezar este tutorial, quisiéramos que hicieras una copia local del archivo [inicio-juego-adivina-numero.html](https://github.com/carevalojesus/10018-LP1/tree/main/Unidad-01/primer-acercamiento). Ábrelo en tu editor de texto y en tu navegador web. De momento, puedes ver un sencillo encabezado, un párrafo de instrucciones y un espacio para introducir un intento de número, pero no hará nada por ahora.

El lugar donde agregaremos todo nuestro código es dentro del elemento `<script>` en la parte inferior del HTML:

	<script>
	
	  // Tu JavaScript va aquí
	
	</script>

### Añadiendo variables para guardar los datos

Empecemos. En primer lugar, agrega las siguientes líneas dentro de tu elemento `<script>`

    
      let numeroAleatorio = Math.floor(Math.random() * 100) + 1;

      const conjeturas = document.querySelector(".conjeturas");
      const resultadoFinal = document.querySelector(".resultadoFinal");
      const bajoOalto = document.querySelector(".bajoOalto");

      const conjeturasEnviar = document.querySelector(".conjeturasEnviar");
      const conjeturaCampo = document.querySelector(".conjeturaCampo");

      let conjeturaContador = 1;
      let botonResetear;

Esta sección del código establece las variables y constantes que necesitamos para almacenar los datos que nuestro programa utilizará. 

Las variables básicamente son contenedores de valores (como números o cadenas de texto). Creas una variable con la palabra clave `let` (o `var`) seguida de un nombre para tu variable.

Las constantes se utilizan para almacenar valores que no deseas modificar y se crean con la palabra clave `const`. En este caso, estamos usando constantes para almacenar referencias a partes de nuestra interfaz de usuario; el texto dentro de algunas de ellas puede cambiar, pero los elementos HTML a los que se hace referencia permanecer iguales.

Puedes asignar un valor a tu variable o constante con un signo igual (=) seguido del valor que deseas darle.

En nuestro ejemplo:

- A la primera variable — `numeroAleatorio` — se le asigna un número al azar entre 1 y 100, calculado usando un algoritmo matemático.
- Las primeras tres constantes sirven cada una para almacenar una referencia a los párrafos de resultados en nuestro HTML, y se usarán para insertar valores en los párrafos más adelante en el código (observa cómo están dentro de un elemento `<div>`, el cual se utiliza para seleccionar los tres más adelante para restablecerlos a sus valores originales, cuando reiniciamos el juego):

		<div class="resultadoParrafo">
			<p class="conjeturas"></p>
		   	<p class="resultadoFinal"></p>
			<p class="bajoOalto"></p>
		</div>

- Las siguientes dos constantes almacenan referencias a la entrada de texto y al botón "Enviar" del formulario, y se utilizan para controlar las respuestas del jugador más adelante.
  