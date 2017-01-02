#include "Encoding.h"
#include "RTCRootView.h"

@implementation Encoding
RTC_EXPORT_MODULE();
RTC_EXPORT_METHOD(base64Encode:(NSString*)str callback:(RTCResponseSenderBlock)callback)
{
    NSData *nsdata = [str dataUsingEncoding:NSUTF8StringEncoding];
    NSString *base64Encoded = [nsdata base64EncodeStringWithOptions:0];

    callback(@[base64Encoded]);
}
@end