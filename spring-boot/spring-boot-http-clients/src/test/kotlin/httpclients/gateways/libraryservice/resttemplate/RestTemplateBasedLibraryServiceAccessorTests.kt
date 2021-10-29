package httpclients.gateways.libraryservice.resttemplate

import com.github.tomakehurst.wiremock.junit5.WireMockRuntimeInfo
import com.github.tomakehurst.wiremock.junit5.WireMockTest
import httpclients.gateways.libraryservice.LibraryServiceContract
import httpclients.gateways.libraryservice.LibraryServiceProperties
import okhttp3.OkHttpClient

@WireMockTest
internal class RestTemplateBasedLibraryServiceAccessorTests(
    wireMockInfo: WireMockRuntimeInfo
) : LibraryServiceContract {
    override val wireMock = wireMockInfo.wireMock
    override val cut = RestTemplateBasedLibraryServiceAccessor(
        httpClient = OkHttpClient(),
        properties = LibraryServiceProperties(baseUrl = wireMockInfo.httpBaseUrl)
    )
}
