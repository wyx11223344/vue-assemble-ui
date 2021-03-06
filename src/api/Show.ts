/**
 * @author WYX
 * @date 2020/7/14
 * @Description: Show页面接口提供
*/
import { AxiosDec } from '@/decorators/axiosDec';

export default class Show {

    @AxiosDec.Post('/code/CodeControl/getAllComponentsWithHtml')
    static getAllComponentsWithHtml: any

    @AxiosDec.Post('/code/CodeControl/getAllClassify')
    static getAllClassify: any

    @AxiosDec.Post('/code/CodeControl/getComponentsByIds')
    static getComponentsByIds: any

}
