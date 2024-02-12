const path = require('path')

//(i)
function extractFileInfo(filePath){
    let extension = path.extname(filePath);
    let baseName =  path.basename(filePath);
    let dirname = path.dirname(filePath);

    return{
        extension,
        baseName,
        dirname
    }
}


console.log(extractFileInfo('dir1/dir2/file1.txt'));

// (ii)
function processFilePaths(filePaths){
    let output = filePaths.map((filePath)=>{
        return extractFileInfo(filePath);
    })
    return output;
}


//(iii)
const filePaths = [
    'dir1/dir2/file1.txt',
    'dir1/dir3/file2.txt',
    'dir1/dir3/file3.md',
    'dir4/file4.jpg',
    'dir4/file5.pdf',
    ];

console.log(processFilePaths(filePaths));