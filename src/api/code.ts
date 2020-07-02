/**
 * @author WYX
 * @date 2020/5/26
 * @Description: code接口封装
*/
import { AxiosDec } from '@/decorators/axiosDec';

export default class Code {
	@AxiosDec.Post('/code/codeOnline/setHtml')
	static setHtml: any

	@AxiosDec.Post('/code/codeOnline/getTemplate')
	static getTemplate: any

	@AxiosDec.Post('/code/codeOnline/saveTemplate')
	static saveTemplate: any

	@AxiosDec.Post('/code/codeOnline/saveCodeTemplate')
	static saveCodeTemplate: any
}
