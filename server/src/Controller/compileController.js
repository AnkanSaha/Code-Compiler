const exec = require('child_process').exec
const fs = require('fs');


exports.compile = [
    async (req, res) => {
        try {

        } catch (error) {

        }
    }

]

// const test = async (Props, Code) => {
//   await fs.promises.writeFile(`${Props}.c`,  Code)

//   const C_command = `gcc -o ${Props}  ${Props}.c`; // Replace with your Linux command

// exec(C_command, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.error(`stderr: ${stderr}`);
//     return;
//   }
//   console.log(`Compiled Successfully output:\n${stdout}`);
// });

// // Run(Props)
// }

// const Run = (Sets) => {
//   const Comp = `./${Sets}`; // Replace with your Linux command

// exec(Comp, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.error(`stderr: ${stderr}`);
//     return;
//   }
//   console.log(`Compiled Command output:\n${stdout}`);
// });
// }

// test('Ankan', `
// #include <stdio.h>
// int main() {
//   printf("Hello World");
//   return 0;
// }
// `)