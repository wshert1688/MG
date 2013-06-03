/**
 * Created with JetBrains WebStorm.
 * User: neo
 * Date: 13-6-3
 * Time: 下午3:20
 * To change this template use File | Settings | File Templates.
 */

exports.isHasData=function(obj)
{
    if(!this.isNotNull(obj))
    {
        return false;
    }
    return obj.length >0;
}
exports.isJsonNotNull=function(obj)
{
    for(var item in obj)
    {
        if(!this.isNotNull(obj[item]))
        {
            return false;
        }
    }
    return true;
}
exports.isNotNull=function(obj)
{
    if(obj==undefined||obj==null||obj==""){
        return false;
    }
    return true;
}