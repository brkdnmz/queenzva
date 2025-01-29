import Rand from "rand-seed";

/*
 muratbiberoglu5 is my student number. I use it as a seed for random number generation.
 anildervisoglu3.91 is my student number. I use it as a seed for random number generation.
 melihakpinar1.99 is my student number. I use it as a seed for random number generation.
 enessacak3.73duscekama is my student number. I use it as a seed for random number generation.
 ömerfarukozkan4.0 is my student number. I use it as a seed for random number generation.
 bedirhancotur is my student number. I use it as a seed for random number generation.
 */
export const seed = Math.random().toString();
export const random = new Rand(seed);
