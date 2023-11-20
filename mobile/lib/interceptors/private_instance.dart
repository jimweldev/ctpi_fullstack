import 'package:dio/dio.dart';

class PrivateInstance {
  static final Dio _dio = Dio(BaseOptions(
    baseUrl: 'http://10.0.2.2:4000',
    connectTimeout: const Duration(seconds: 5),
    receiveTimeout: const Duration(seconds: 5),
  ));

  Dio get dio => _dio;

  // Singleton pattern
  static final PrivateInstance _instance = PrivateInstance._internal();

  factory PrivateInstance() {
    return _instance;
  }

  PrivateInstance._internal();
}
