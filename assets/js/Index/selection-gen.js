
const selectGen = {}

selectGen.pokeGen = (genOption) =>{
    if (genOption == 0) return 905

    if (genOption == 1) return 151

    if (genOption == 2) return 251

    if (genOption == 3) return 386

    if (genOption == 4) return 493

    if (genOption == 5) return 649

    if (genOption == 6) return 721

    if (genOption == 7) return 809

    if (genOption == 8) return 905

    return 151
}

selectGen.startGen = (genOption) =>{
    if (genOption == 0) return 0

    if (genOption == 1) return 0

    if (genOption == 2) return 151

    if (genOption == 3) return 251

    if (genOption == 4) return 386

    if (genOption == 5) return 493

    if (genOption == 6) return 649

    if (genOption == 7) return 721

    if (genOption == 8) return 809

    return 0

}