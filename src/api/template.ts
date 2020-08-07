/**
 * @author WYX
 * @date 2020/8/4
 * @Description: 第三方包接口类
 */
import { AxiosDec } from '@/decorators/axiosDec';

export default class Template {

	@AxiosDec.Post('/template/templateControl/getTemplateById')
	static getTemplateById: any

	@AxiosDec.Post('/template/templateControl/getTemplateName')
	static getTemplateName: any

}
