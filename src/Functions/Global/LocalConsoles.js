/**
 * The function `cg` logs a message `m` along with an additional value `i` to the console in a
 * development environment.
 * @param m - The parameter `m` in the `cg` function is a message or string that will be logged to the
 * console along with the value of the second parameter `i`.
 * @param i - The `i` parameter in the `cg` function is used as an argument that will be logged to the
 * console along with the message `m`.
 * @returns In the provided code snippet, if the `process.env.NODE_ENV` is equal to 'production', then
 * nothing is being returned explicitly. The `return;` statement without a value simply exits the
 * function without returning any specific value.
 */
export const cg = (m,i) =>{
    if (process.env.NODE_ENV === 'production') {
        return ;
      }
    console.log( `${m}`,i);
}
/**
 * The function `ct` logs the input `i` as a table in the console if the environment is not set to
 * production.
 * @param i - The `ct` function takes a parameter `i` and displays it in a table format using
 * `console.table`. However, if the environment is set to 'production', it will not display anything.
 * @returns In the provided code snippet, if the `process.env.NODE_ENV` is equal to `'production'`,
 * then nothing is being returned explicitly. The `return` statement is followed by a semicolon without
 * any value being returned. 
 */
export const ct = (i) =>{
    if (process.env.NODE_ENV === 'production') {
        return ;
      }
    console.table(i);
}