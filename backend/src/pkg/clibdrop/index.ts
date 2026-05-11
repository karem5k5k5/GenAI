import axios from "axios";
import { envConfig } from "../../config/env";

class ClipDropService {
    async generateImage(prompt: string) {
        const formData = new FormData()
        formData.append('prompt', prompt)

        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                'x-api-key': envConfig.clipDropApiKey
            },
            responseType: "arraybuffer"
        });

        return data;
    }
}

export default new ClipDropService();
