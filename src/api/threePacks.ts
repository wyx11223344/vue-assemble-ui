/**
 * @author WYX
 * @date 2020/8/4
 * @Description: 第三方包接口类
*/
import { AxiosDec } from '@/decorators/axiosDec';

export default class ThreePacksApi {

	@AxiosDec.Post('/packs/threePacks/getPacks')
	static getPacks: any

	@AxiosDec.Post('/packs/threePacks/getPacksByIds')
	static getPacksByIds: any

	@AxiosDec.Post('/packs/threePacks/savePacks')
	static savePacks: any

}
