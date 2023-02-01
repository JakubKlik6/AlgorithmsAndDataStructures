#Napisać funkcję, która dla wprowadzonej tablicy liczb sprawdzi, czy istnieją dwie pary kolejnych liczb,
#dających ten sam iloczyn, i zwróci ich pozycje (indeksy pierwszych liczb danej trójki pary oczywiście) dla
#pierwszej takiej powtórki


def find_pairs(arr):
    for i in range(len(arr) - 1):
        for j in range(i + 1, len(arr)):
            if arr[i] * arr[j] in arr[i + 1:j]:
                return (i, arr[i + 1:j].index(arr[i] * arr[j]) + i + 1)
    return None
