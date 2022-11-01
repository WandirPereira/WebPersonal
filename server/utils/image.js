function getFilePath(file){
    const filePath = file.path;
    //console.log(filePath);
    const fileSplit = filePath.split("\\");
    return `${fileSplit[1]}\\${fileSplit[2]}`;
}

module.exports = {
    getFilePath,
}