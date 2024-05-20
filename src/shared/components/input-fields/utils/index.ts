export function regexFile (file: File, regexString: string) {
    const filename = file.name || ''
    const regex = new RegExp(regexString)
    return regex.test(filename.toLowerCase())
}

export function checkMaxFile (files: any[], max: number) {
   return files.length < max;
}

export function checkMaxSize (file: File, maxSize: number) {
    return file.size < (maxSize * 1024 * 1024); 
 }

export function wrapperValidate (callback: () => boolean, msgError: string): {status: boolean, msgError: string} {
    return {
        status: callback(),
        msgError: !callback() ? msgError : '',
    }
 }