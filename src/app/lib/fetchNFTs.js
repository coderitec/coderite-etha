import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_ALCHEMY_URL}/getNFTs`

export const fetchNFTs = async (wallet) => {
    const response = await axios.get(`${BASE_URL}?owner=0x8a90cab2b38dba80c64b7734e58ee1db38b8992e`)
    return response.data.ownedNfts;
}