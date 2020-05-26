/**
 * @author WYX
 * @date 2020/5/26
 * @Description: code接口封装
*/
import { AxiosDec } from '@/decorators/axiosDec';

export default class Code {
	@AxiosDec.Post('/setHtml')
	static setHtml: any
}
