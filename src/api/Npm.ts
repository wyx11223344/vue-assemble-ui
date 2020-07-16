/**
 * @author WYX
 * @date 2020/7/14
 * @Description: Npm页面接口提供
 */
import { AxiosDec } from '@/decorators/axiosDec';

export default class Npm {

    @AxiosDec.Post('/package/npmPackage/getAllNpm')
    static getAllNpm: any

}
