/**
 * @author WYX
 * @date 2020/5/26
 * @Description: code接口封装
*/
import { AxiosDec } from '@/decorators/axiosDec';

export default class Code {
	@AxiosDec.Post('/code/codeOnline/setHtml')
	static setHtml: any

	@AxiosDec.Post('/code/CodeControl/getTemplate')
	static getTemplate: any

	@AxiosDec.Post('/code/CodeControl/saveHtmlTemplate')
	static saveTemplate: any

	@AxiosDec.Post('/code/CodeControl/saveCodeTemplate')
	static saveCodeTemplate: any

	@AxiosDec.Post('/code/CodeControl/delectCodeById')
	static delectCodeById: any

	@AxiosDec.Post('/code/CodeControl/getAllComponents')
	static getAllComponents: any

	@AxiosDec.Post('/package/npmPackage/createNewNpm')
	static createNewNpm: any
}
