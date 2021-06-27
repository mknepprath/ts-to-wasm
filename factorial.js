export const wasmInstantiate = async (wasmModuleUrl, importObject) => {
    let response = undefined;

    if (!importObject) {
        importObject = {
            env: {
                abort: () => console.log("Error!")
            }
        }
    }

    const instantiateModule = async () => {
        //1. I'm going to use the Fetch method to download the module.
        const response = await fetch("./factorial.wasm");
        const buffer = await response.arrayBuffer();
        //2. Here, we instantiate the Wasm module.
        const obj = await WebAssembly.instantiate(buffer, importObject);
        return obj
    }

    response = await instantiateModule();

    //3. Return the Wasm module.
    return response;
}

const executeWasmFactorial = async () => {
    //1. Instantiate the Wasm module.
    const wasmModule = await wasmInstantiate("./factorial.wasm");

    //2. Call our factorial function export from Wasm.
    const factorialResult = wasmModule.instance.exports.factorial(8)

    //3. Set the result to our HTML "factorialResultId" element.
    document.getElementById("factorialResultId").innerHTML = `The result is: <strong>${factorialResult}</strong>`;
}

executeWasmFactorial();
